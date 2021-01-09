/**
 * Provides processing of Ethereum transaction receipts relevant for the CIC network.
 *
 * @module helper
 */


import {CICRegistry, Registry, toContractKey} from './registry';
import { Transfer } from './common/erc20';
import { Conversion } from './bancor/convert';
import {EVMAddress, FungibleToken} from "./typ";
import {interfaceCodes} from "./solidity";
import {zeroAddress} from "./const";

/**
 * Reduced, concrete view of a transaction receipt.
 *
 * @todo Is there a way of importing the web3 type instead?
 */
class Receipt {
	logs:	Array<any>
	status:	boolean

}


/**
 * Receipt processor within context of a given registry.
 *
 */
class TransactionHelper {

	w3:		any
	registry:	Registry
	ontransfer:	(Transfer) => void
	onconversion:	(Conversion) => void

	/**
	 *
	 * @param registry The registry context to use
	 */
	constructor(w3:any, registry:Registry) {
		this.w3 = w3;
		this.registry = registry;

		this.ontransfer = (t) => {
			console.debug('transfer ', t);
		}
		this.onconversion = (c) => {
			console.debug('convert ', c);
		}
	}

	/**
	 * Processes a single receipt to find conversion and token transfer events.
	 *
	 * If a transfer is found, ontransfer callback will be called with a Transfer instance.
	 * If a conversion is found, onconvsrsion callback will be called with a Conversion instance.
	 *
	 * @param r A Web3 transaction receipt.
	 * @todo The from-amount of convert is currently wrong, but be retrieved from the initial transfer log entry instead.
	 */
	public async processReceipt(r:Receipt) {
		const self = this;
		const logs = r.logs;
		// TODO: Improve (vastly) by inspecting bloom filter instead
		// TODO: Double check that convert was called on bancornetwork if found
		let convert_log = undefined;
		let token_txs = [];
		for (let i = 0; i < logs.length; i++) {
			// TODO: this seems like a very brittle test, improve
			const contractAddress = logs[i].address;
			//if (this.registry.contracts_r[contractAddress] !== undefined) {
			try {
				const t = await this.registry.getToken(contractAddress);
				token_txs.push([r.status, t, logs[i]]);
			} catch(e) {
				try {
					const d = await this.registry.getAddressDeclaration('AddressDeclarator', contractAddress);
					console.debug('trust record for ' + contractAddress + ' found', d);
					const t = await this.registry.addToken(contractAddress);
					token_txs.push([r.status, t, logs[i]]);
				} catch(e) {
					console.debug('fisrst error', e);
					try {
						await this.registry.getContract(contractAddress);
						convert_log = logs[i];
						console.debug('found bancornetwork tx');
						break;
					} catch(e) {
						console.debug('second error', e);
						console.debug('no match in log entry ' + i);
						continue;
					}

				}
			}
		}
		if (convert_log !== undefined) {
			const conversion = await Conversion.processLog(this.w3, this.registry, r.status, convert_log);
			if (conversion !== undefined) {
				this.onconversion(conversion);
			}
		} else {
			for (const a of token_txs) {
				const transfer = await Transfer.processLog(this.w3, a[0], a[1], a[2]);
				if (transfer !== undefined) {
					this.ontransfer(transfer);
				}
			}
		}
	}
}

/**
 * Declarator query within the context of a registry.
 */
class DeclaratorHelper {

	registry: CICRegistry
	trusts: EVMAddress[]

	/**
	 *
	 * @param registry The registry context to use.
	 */
	constructor(registry: any) {
		this.registry = registry;
		this.trusts = [];
	}

	/**
	 * Add an address to list of declarators to trust.
	 *
	 * @param address The address to be added to the trust list
	 */
	public addTrust(address:EVMAddress) {
		this.trusts.push(address);
	}

	/**
	 * Check for trust records of a token
	 *
	 *  if there are no trust records, an error will be thrown.
	 *
	 * @param tokenRegistryContractName The name of the token in the token registry.
	 * @param tokenAddress The address of the contract used to deploy the token.
	 * @param checkInterface A boolean on whether to to check the interface.
	 */
	public async getTrustedTokenDeclaration(tokenRegistryContractName:string, tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		for (let i = 0; i < this.trusts.length; i++) {
			console.debug('checking for trust record by ' + this.trusts[i] + ' for token ' + tokenAddress);
			try {
				return this.getTokenDeclaration(tokenRegistryContractName, this.trusts[i], tokenAddress,checkInterface);
			} catch {
			}
		}
		throw new Error('no trusted records for token ' + tokenAddress);
	}

	/**
	 * Check for trust records for a token by a declarator.
	 *
	 * @param tokenRegistryContractName The name of the token in the token registry.
	 * @param declarator The address of the declarator used to check for trust.
	 * @param tokenAddress The address of the contract used to deploy the token.
	 * @param checkInterface A boolean on whether to to check the interface.
	 */
	public async getTokenDeclaration(tokenRegistryContractName:string, declarator:EVMAddress, tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		const contractKey = toContractKey(tokenRegistryContractName);
		let tokenRegistryContract = await this.registry.fetchFromStore(contractKey);
		if (tokenRegistryContract === undefined) {
			tokenRegistryContract = await this.registry.getContractByName(
				tokenRegistryContractName,
				'AddressDeclarator',
				[interfaceCodes.Declarator],
			);
			this.registry.addToStore(contractKey, tokenRegistryContract);
		}
		const declarationParts = await tokenRegistryContract.methods.declaration(declarator, tokenAddress).call();
		if (declarationParts.length == 1 && declarationParts[0] == zeroAddress) {
			throw new Error('no declarations found for declarator "' + declarator + '" address "' + tokenAddress + '"');
		}
		console.log(declarationParts);
		return declarationParts;
	}
}


export {
	DeclaratorHelper,
	TransactionHelper
}
