const LRU = require('lru-cache');
import { abi, bin, interfaceCodes } from './solidity';
import { zeroAddress } from './const';
import { EVMMethodID, EVMAddress, EVMContract, FungibleToken } from './typ';
import { subtle } from './crypto';
import { bytesToHex } from './digest';
import { FileGetter } from './file';

class KV {
	store = {};

	public put(k:string, v:any) {
		this.store[k] = v;
	}

	public get(k:string): any {
		return this.store[k];
	}

	public peek(k:string): any {
		return this.store[k];
	}
}

interface Registry {
	getAbi(abiName:string): Promise<object>;
	getContract(address:EVMAddress): Promise<EVMContract>;
	getContractByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<EVMContract>;
	getContractAddressByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<string>;
	getToken(address:EVMAddress): Promise<FungibleToken>;
	getTokenBySymbol(tokenRegistryContractName:string, symbol:string, checkInterface:boolean): Promise<FungibleToken>;
	getTokenDeclaration(tokenRegistryContractName:string, declarator:EVMAddress, tokenAddress:EVMAddress, checkInterface?:boolean): Promise<FungibleToken>;
	getTrustedTokenDeclaration(tokenRegistryContractName:string, tokenAddress:EVMAddress, checkInterface?:boolean): Promise<FungibleToken>;
	addToken(address:EVMAddress): Promise<EVMContract>;
	addTrust(address:EVMAddress);
}

class CICRegistry {

	w3: any
	fileGetter: FileGetter
	address: string
	contract: any // TODO: replace with web3 contract type
	store: KV 
	paths: string[]
	chainSpecs: Object
	trusts: EVMAddress[]
	onload: (a:string) => void

	constructor(w3:any, address:EVMAddress, fileGetter:FileGetter, paths:string[]=['.']) {
		this.w3 = w3;
		this.address = address;
		this.store = new KV();
		this.paths = paths;
		this.fileGetter = fileGetter;
		this.trusts = [];
	}

	public addTrust(address:EVMAddress) {
		this.trusts.push(address);
	}

	public async load() {
		const registryAbi = await abi(this.fileGetter, 'CICRegistry', this.paths);
 		this.contract = new this.w3.eth.Contract(registryAbi, this.address);

		const contractIdHex = this.w3.utils.toHex('CICRegistry');
		const contractId = this.w3.eth.abi.encodeParameter('bytes32', contractIdHex);
		const confirmedContractAddress = await this.contract.methods.addressOf(contractId).call();

		if (this.address != confirmedContractAddress) {
			throw new Error('cic registry contract entry does not match its own address');
		}

		if (this.onload !== undefined) {
			this.onload(this.address);
		}
	}

	public async getAbi(abiName:string): Promise<object> {
		let abiObject = this.store.get(toAbiKey(abiName))
		if (abiObject === undefined) {
			abiObject = await abi(this.fileGetter, abiName, this.paths);
		}
		return abiObject;
	}

//	public async getUnknownContract(address:EVMAddress): Promise<EVMContract> {
//		const declarator = this.registry.getContractByName('AddressDeclarator', 'Declarator');
//		for (let i = 0; i < this.trusts; i++) {
//			const declarationRecord = declarator.getDeclaration();
//			if (declarationRecord !== undefined) {
//				const tokenAbi = this.getAbi('ERC20');
//				const contract = new this.w3.eth.Contract(tokenAbi, address);
//				const tokenSymbol = contract.methods.symbol();
//			}
//		}
//		throw new Error('no trusted records found for address ' + address;
//	}

	public async addToken(address:EVMAddress, requireTrust:boolean=false): Promise<EVMContract> {
		if (requireTrust) {
			throw new Error('trust check not implemented yet, sorry');
		}
		const erc20Abi = await this.getAbi('ERC20');
		const tokenContract = new this.w3.eth.Contract(erc20Abi, address);
		const tokenSymbol = await tokenContract.methods.symbol().call();
		if (tokenSymbol === undefined) {
			throw new Error('attempted to add token contract ' + address + ' which is not an ERC20 token');
		}
		this.store.put(toTokenKey(tokenSymbol), tokenContract);
		this.store.put(address, tokenContract);
		return tokenContract;
	}

	public async getContract(address:EVMAddress): Promise<EVMContract> {
		let contract = this.store.get(address);
		if (contract === undefined) {
			throw new Error('unknown contract ' + address);
		}
		return contract;
	}

	public async getToken(address:EVMAddress): Promise<EVMContract> {
		const tokenContract = await this.getContract(address);
		const tokenSymbol = await tokenContract.methods.symbol().call();
		if (tokenSymbol === undefined) {
			throw new Error('contract ' + address + ' is not an ERC20 token');
		}
		return tokenContract;
	}

	public async getContractByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<EVMContract> {
		const contractAddress = await this.getContractAddressByName(contractName, abiName, requireInterfaces);
		if (abiName === undefined) {
			abiName = contractName;
		}
		const contractAbi = await this.getAbi(abiName);
		console.log(contractAbi);
		const contract = new this.w3.eth.Contract(contractAbi, contractAddress);
		this.store.put('contract:' + contractName, contract);
		this.store.put(contractAddress, contract);
		console.debug('added contract', contractName, contractAddress);
		return contract;
	}

	public async getContractAddressByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<string> {
		const contract_id_hex = this.w3.utils.toHex(contractName);
		const contract_id = this.w3.eth.abi.encodeParameter('bytes32', contract_id_hex);
		const contractAddress = await this.contract.methods.addressOf(contract_id).call();
		if (contractAddress == zeroAddress) {
			throw new Error('unknown contract ' + contractName + ' (' + contract_id_hex + ')');
		}
		return contractAddress;
	}

	public async getFungibleToken(tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		const tokenAbi = await this.getAbi('ERC20');
		const tokenContract = new this.w3.eth.Contract(tokenAbi, tokenAddress);
		if (checkInterface) {
			if (!tokenContract.methods.supportsInterface('ERC20')) {
				throw 'token does not declare ERC20 interface support';
			}
		}
		const tokenSymbol = await tokenContract.methods.symbol().call();
		this.store.put('token:' + tokenSymbol, tokenContract);
		this.store.put(tokenAddress, tokenContract);
		return tokenContract;
	}

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

	public async getTokenDeclaration(tokenRegistryContractName:string, declarator:EVMAddress, tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		const contractKey = toContractKey(tokenRegistryContractName);
		let tokenRegistryContract = this.store.get(contractKey);
		if (tokenRegistryContract === undefined) {
			tokenRegistryContract = await this.getContractByName(
				tokenRegistryContractName,
				'AddressDeclarator',
				[interfaceCodes.Declarator],
			);
			this.store.put(contractKey, tokenRegistryContract);
		}
		const declarationParts = await tokenRegistryContract.methods.declaration(declarator, tokenAddress).call();
		if (declarationParts.length == 1 && declarationParts[0] == zeroAddress) {
			throw new Error('no declarations found for declarator "' + declarator + '" address "' + tokenAddress + '"');
		}
		console.log(declarationParts);
		return declarationParts;
	}

	public async getTokenBySymbol(tokenRegistryContractName:string, symbol:string, checkInterface:boolean=false): Promise<FungibleToken> {
		const contractKey = toContractKey(tokenRegistryContractName);
		let tokenRegistryContract = this.store.get(contractKey);
		if (tokenRegistryContract === undefined) {
			tokenRegistryContract = await this.getContractByName(
				tokenRegistryContractName,
				'Registry',
				[interfaceCodes.Registry],
			);
			this.store.put(contractKey, tokenRegistryContract);
			this.store.put(tokenRegistryContract.options.address, tokenRegistryContract);
		}
		const symbolId = await toRegistryKey(symbol);
		const tokenAddress = await tokenRegistryContract.methods.addressOf(symbolId).call();
		if (tokenAddress === zeroAddress) {
			throw 'unknown token "' + symbol + '" using registry "' + tokenRegistryContractName + '"';
		}
		console.log(tokenAddress);
		const token = this.getFungibleToken(tokenAddress, checkInterface);
		return token;
	}
}

async function toRegistryKey(s:string): Promise<string> {
	const sDigest = await subtle.digest('SHA-256', s);
	const sId = '0x' + bytesToHex(sDigest);
	return sId;
}

function toContractKey(s:string): string {
	return 'contract:' + s;
}

function toAbiKey(s:string): string {
	return 'abi:' + s;
}

function toTokenKey(s:string): string {
	return 'token:' + s;
}

export {
	CICRegistry,
	Registry,
}
