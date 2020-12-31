const web3 = require('web3');
const LRU = require('lru-cache');
import { abi, bin, interfaceCodes } from './solidity';
import { zeroAddress } from './const';
import { EVMMethodID, EVMAddress, EVMContract, FungibleToken } from './typ';
import { subtle } from './crypto';

const utilWeb3 = new web3();

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

class CICRegistry {

	w3: any
	address: string
	contract: any // TODO: replace with web3 contract type
	store: KV 
	paths: string[]
	chainSpecs: Object
	onload: (a:string) => void

	constructor(w3:any, address:EVMAddress, paths:string[]=['.']) {
		this.w3 = w3;
		this.address = address;
		this.store = new KV();
		this.paths = paths;

		const registryAbi = abi('CICRegistry', paths);
 		this.contract = new w3.eth.Contract(registryAbi, this.address);
	}

	public async load() {
		const contractIdHex = this.w3.utils.toHex('CICRegistry');
		const contractId = this.w3.eth.abi.encodeParameter('bytes32', contractIdHex);
		const confirmedContractAddress = await this.contract.methods.addressOf(contractId).call();

		if (this.address != confirmedContractAddress) {
			throw 'cic registry contract entry does not match its own address';
		}
	}

	public getAbi(abiName:string) {
		let abiObject = this.store.get(toAbiKey(abiName))
		if (abiObject === undefined) {
			abiObject = abi(abiName, this.paths);
		}
		return abiObject;
	}

	public async getContractByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<EVMContract> {
		const contractAddress = await this.getContractAddressByName(contractName, abiName, requireInterfaces);
		if (abiName === undefined) {
			abiName = contractName;
		}
		const contractAbi = this.getAbi(abiName);
		console.log(contractAbi);
		const contract = new this.w3.eth.Contract(contractAbi, contractAddress);
		this.store.put('contract:' + contractName, contract);
		console.debug('added contract', contractName, contractAddress);
		return contract;
	}

	public async getContractAddressByName(contractName:string, abiName?:string, requireInterfaces?:EVMMethodID[]): Promise<string> {
		const contract_id_hex = this.w3.utils.toHex(contractName);
		const contract_id = this.w3.eth.abi.encodeParameter('bytes32', contract_id_hex);
		const contractAddress = await this.contract.methods.addressOf(contract_id).call();
		if (contractAddress == zeroAddress) {
			throw 'unknown contract ' + contractName;
		}
		return contractAddress;
	}

	public async getFungibleToken(tokenAddress:EVMAddress, checkInterface:boolean=false): Promise<FungibleToken> {
		const tokenAbi = this.getAbi('ERC20');
		const tokenContract = new this.w3.eth.Contract(tokenAbi, tokenAddress);
		if (checkInterface) {
			if (!tokenContract.methods.supportsInterface('ERC20')) {
				throw 'token does not declare ERC20 interface support';
			}
		}
		return tokenContract;
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
		if (declarationParts.length == 0) {
			throw 'no declarations found for declarator "' + declarator + '" address "' + tokenAddress + '"';
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
	const sId = utilWeb3.eth.abi.encodeParameter('bytes32', sDigest);
	return sId;
}

function toContractKey(s:string): string {
	return 'contract:' + s;
}

function toAbiKey(s:string): string {
	return 'abi:' + s;
}

export {
	CICRegistry,
}
