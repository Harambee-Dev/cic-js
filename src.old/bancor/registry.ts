/**
 * Registry is the top-leven entrypoint for all relevant objects in the CIC token exchange network.
 *
 * @module registry
 */

import { Token } from './common/erc20';


/**
 * 
 * Provides helper functions and memory cache of Bancor Contract network and tokens.
 *
 * @class Registry
 */
class BancorRegistry {

	w3:		any
	address:	string
	abis:		object
	contracts:	object
	contracts_r:	object		// address to contract index
	tokens:		Array<Token>
	tokens_s:	object		// symbol string to token index
	tokens_r:	object		// address to token index

	converters:	object		
	converters_t:	object		// token address to converter

	init:		object

	ontokenload:	(n:number) => void
	onregistryload:	(s:string) => void


	/**
	 *
	 * @param w3 A connected Web3 object
	 * @param address Ethereum address of the Bancor ContractRegistry contract
	 * @param abis All abis loaded from common/abis and bancor/abis
	 * @todo Introduce abi path to contractid translation
	 */
	constructor(w3:any, address:string, data_path:string) {
		this.w3 = w3;
		this.data_path = data_path;
		this.abis = abis;
		this.address = address;

		this.contracts = {
			'CICRegistry': new this.w3.eth.Contract(this.abis['bancor']['contract_registry'], address),
		};
		this.contracts_r = {};
		this.contracts_r[address] = this.contracts['bancor_contract_registry'];

		this.tokens = [];
		this.tokens_s = {};
		this.tokens_r = {};

		this.converters = {};
		this.converters_t = {};
		
		this.init = {
			network: [1, 4], // current index, target index
			tokens: [0, -1], // current index, target index
		}

		this.ontokensload= function(n:number) {
			console.debug('tokens loaded', n);
		}
		this.onregistryload= function(s:string) {
			console.debug('registry loaded');
		}
	}


	/**
	 * List all network contracts
	 *
	 * @return Object with contract ids as keys and contract addresses as values
	 */
	public getNetworkContracts(): Promise<Object> {
		let ids = {};
		return new Promise(async (whohoo, doh) => {
			const cr = this.contracts['bancor_contract_registry'];
			const idList = Object.values(registryContractIds);
			for (let i = 0; i < idList.length; i++) {
				const k = idList[i];
				let crid_hex = this.w3.utils.toHex(k)
				let shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
				const v = await cr.methods.addressOf(shaid).call();
				ids[k] = v;
			}
			whohoo(ids);
		});
	}

	// TODO: DRY
	/**
	 * Loads contract objects necessary for token deployment and conversion into memory.
	 * Optionally pre-loads all convertible tokens.
	 *  
	 * When both the ontokensload and onregistryload callbacks have been called, then all operations have been completed.
	 *
	 * @param loadTokens If true, will pre-load all convertible tokens.
	 */
	public async load(loadTokens:boolean=false) {
		console.debug('loading registry');


		const cr = this.contracts['bancor_contract_registry'];
		let crid_hex = this.w3.utils.toHex('BancorConverterRegistry');
		let shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
		cr.methods.addressOf(shaid).call().then((address) => {
			const abi = this.abis['bancor']['converter_registry'];
			this.contracts['bancor_converter_registry'] = new this.w3.eth.Contract(abi, address);
			this.contracts_r[address] = this.contracts['bancor_converter_registry'];
			console.log('bancor converter registry', address);
			if (loadTokens) {
				this.loadTokens();
			} else {
				this.ontokensload(0);
			}

			this.init['network'][0]++;
			if (this.init['network'][0] == this.init['network'][1]) {
				this.onregistryload(this.address);
			}
		});
		crid_hex = this.w3.utils.toHex('BancorNetwork');
		shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
		cr.methods.addressOf(shaid).call().then((address) => {
			this.contracts['bancor_network'] = new this.w3.eth.Contract(this.abis['bancor']['network'], address);
			this.contracts_r[address] = this.contracts['bancor_network'];
			console.log('bancor network', address);
			this.init['network'][0]++;
			if (this.init['network'][0] == this.init['network'][1]) {
				this.onregistryload(this.address);
			}
		});
		crid_hex = this.w3.utils.toHex('BNTToken');
		shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
		cr.methods.addressOf(shaid).call().then((address) => {
			this.contracts['reserve'] = new this.w3.eth.Contract(this.abis['common']['erc20'], address);
			this.contracts_r[address] = this.contracts['reserve'];
			console.log('reserve', address);
			this.init['network'][0]++;
			if (this.init['network'][0] == this.init['network'][1]) {
				this.onregistryload(this.address);
			}
		});
	}


	/**
	 * Load all convertible token metadata into registry memory.
	 *
	 */
	public async loadTokens() {
		console.debug('loading tokens');
		const cr = this.contracts['bancor_converter_registry'];
		const addresses = await cr.methods.getConvertibleTokens().call();
		this.init['tokens'][1] = addresses.length;
		if (addresses.length == 0) {
			console.warn('no tokens in network');
			this.ontokensload(0);
		}
		addresses.forEach(async (address) => {
			this.addToken(address).then(() => {
				console.debug('l ', this.tokens.length, addresses.length);
				if (this.tokens.length == addresses.length) {
					this.ontokensload(this.tokens.length);
				}
			}).catch((e) => {
				console.error(e);	
			});
		});
	}

	/**
	 * Add token metadata to registry memory.
	 *
	 * @param address Ethereum address of token
	 *
	 */
	public async addToken(address:string) {
		const abi = this.abis['common']['erc20'];
		const ct = new this.w3.eth.Contract(abi, address);
		const symbol = await ct.methods.symbol().call();
		const name = await ct.methods.name().call();
		const decimals = await ct.methods.decimals().call();
		const totalSupply = await ct.methods.totalSupply().call();

		try {
			const owner = await ct.methods.owner().call();
			if (this.converters[owner] === undefined) {
				this.converters[owner] = await this.getConverter(owner);
			}
			this.converters_t[address] = this.converters[owner];
		} catch {
			console.log('token ' + address + ' has no owner');
		}

		const t = new Token(address, name, symbol, decimals, totalSupply);
		const ti = this.tokens.length;
		this.tokens.push(t);
		this.tokens[t.symbol] = this.tokens[ti];
		this.tokens_r[address] = this.tokens[ti];
		this.init['tokens'][0]++;
		console.log('added token', t.toString(), ti, address);
		//if (this.init.tokens[0] == this.init.tokens[1]) {
		//	this.ontokenload(this.init.tokens[0]);
		//}
	}

	public async getConverter(converterAddress:string) {
		const tokenAbi = this.abis['common']['erc20'];
		const converterAbi = this.abis['bancor']['converter'];
		const ct = new this.w3.eth.Contract(converterAbi, converterAddress);
		const owner = await ct.methods.owner().call();
		const reserveRatio = await ct.methods.reserveRatio().call();
		const reserveCount = await ct.methods.reserveTokenCount().call();

		let reserves = [];
		for (let i = 0; i < reserveCount; i++) {
			const reserveAddress = await ct.methods.reserveTokens(i).call();
			const weight = await ct.methods.reserveWeight(reserveAddress).call();
			const balance = await ct.methods.reserveBalance(reserveAddress).call();
			const reserve = new ReserveConnection(reserveAddress, weight, balance);

			reserves.push(reserve);
		}
		return new Converter(converterAddress, owner, reserveRatio, reserves);
	}

	/**
	 * List all reserve tokens on network
	 *
	 */
	public reserves(): Array<any> {
		return [this.contracts['reserve']];
	}
}

export {
	Registry,
}
