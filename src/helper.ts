/**
 * Provides processing of Ethereum transaction receipts relevant for the CIC network.
 *
 * @module helper
 */


import {CICRegistry, Registry, toContractKey, toRegistryKey} from './registry';
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
					try {
						await this.registry.getContract(contractAddress);
						convert_log = logs[i];
						break;
					} catch(e) {
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
 * Token query within the context of a registry.
 */
class TokenHelper{

	registry: Registry
	w3: any

	/**
	 *
	 * @param w3
	 * @param registry The registry context to use.
	 */
	constructor(w3: any, registry: Registry) {
		this.w3 = w3;
		this.registry = registry;
	}

	/**
	 * Fetch the fungible token contract associated with a specific address.
	 *
	 * if the contract interface doesn't support ERC20, an error will be thrown.
	 *
	 * @param tokenAddress The contract address used to deploy the contract.
	 * @param checkInterface A boolean on whether to to check the interface.
	 */
	public async getFungibleToken(tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		const tokenAbi = await this.registry.getAbi('ERC20');
		const tokenContract = new this.w3.eth.Contract(tokenAbi, tokenAddress);
		if (checkInterface) {
			if (!tokenContract.methods.supportsInterface('ERC20')) {
				throw 'token does not declare ERC20 interface support';
			}
		}
		await this.registry.addToken(tokenAddress);
		return tokenContract;
	}

	/**
	 * Fetch the token contract associated with a specific symbol.
	 *
	 * If the token address is a zero address, an error will be thrown.
	 *
	 * @param tokenRegistryContractName The name of the contract in the token registry.
	 * @param symbol The symbol of the token.
	 * @param checkInterface A boolean on whether to to check the interface.
	 */
	public async getTokenBySymbol(tokenRegistryContractName:string, symbol:string, checkInterface:boolean=false): Promise<FungibleToken> {
		const contractKey = toContractKey(tokenRegistryContractName);
		let tokenRegistryContract = await this.registry.getContract(contractKey);
		if (tokenRegistryContract === undefined) {
			tokenRegistryContract = await this.registry.getContractByName(
				tokenRegistryContractName,
				'Registry',
				[interfaceCodes.Registry],
			);
		}
		const symbolId = await toRegistryKey(symbol);
		const tokenAddress = await tokenRegistryContract.methods.addressOf(symbolId).call();
		if (tokenAddress === zeroAddress) {
			throw 'unknown token "' + symbol + '" using registry "' + tokenRegistryContractName + '"';
		}
		const token = this.getFungibleToken(tokenAddress, checkInterface);
		return token;
	}
}

/**
 * Declarator query within the context of a registry.
 */
class DeclaratorHelper {

	registry: Registry
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
				return this.registry.getTokenDeclaration(tokenRegistryContractName, this.trusts[i], tokenAddress,checkInterface);
			} catch {
			}
		}
		throw new Error('no trusted records for token ' + tokenAddress);
	}
}


export {
	DeclaratorHelper,
	TransactionHelper,
	TokenHelper
}
