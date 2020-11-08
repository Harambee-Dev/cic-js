import { Token } from './common/erc20';

class Registry {

	w3:		any
	abis:		Object
	contracts:	Object
	contracts_r:	Object		// address to contract index
	tokens:		Array<Token>
	tokens_s:	Object		// symbol string to token index
	tokens_r:	Object		// address to token index

	init:		Object

	ontokensload:	(n) => void
	onregistryload:	() => void


	constructor(w3:any, address:string, abis:Object) {
		this.w3 = w3;
		this.abis = abis;

		this.contracts = {
			'bancor_contract_registry': new this.w3.eth.Contract(this.abis['bancor']['contract_registry'], address),
		};
		this.contracts_r = {};
		this.contracts_r[address] = this.contracts['bancor_contract_registry'];

		this.tokens = [];
		this.tokens_s = {};
		this.tokens_r = {};
		
		this.init = {
			network: [1, 3], // current index, target index
			tokens: [0, -1], // current index, target index
		}

		this.ontokensload= function(n) {
			console.debug('tokens loaded', n);
		}
		this.onregistryload= function() {
			console.debug('registry loaded');
		}
	}

//	async public load(): void {
//		console.debug('loading registry');
//		const cr = this.contracts['bancor_contract_registry'];
//		let crid_hex = this.w3.utils.toHex('BancorConverterRegistry');
//		let shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
//		cr.methods.getAddress(shaid).call().then((address) => {
//			this.contracts['bancor_converter_registry'] = new this.w3.eth.Contract(this.abis.bancor['converter_registry'], address);
//			this.contracts_r[address] = this.contracts['bancor_converter_registry'];
//			console.log('bancor converter registry', address);
//			this.load_tokens();
//			this.init.network[0]++;
//			if (this.init.network[0] == this.init.network[1]) {
//				this.onregistryload(this.init.network[0]);
//			}
//		});
//		crid_hex = this.w3.utils.toHex('BancorNetwork');
//		shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
//		cr.methods.getAddress(shaid).call().then((address) => {
//			this.contracts['bancor_network'] = new this.w3.eth.Contract(this.abis.bancor['network'], address);
//			this.contracts_r[address] = this.contracts['bancor_network'];
//			console.log('bancor network', address);
//			this.init.network[0]++;
//			if (this.init.network[0] == this.init.network[1]) {
//				this.onregistryload(this.init.network[0]);
//			}
//		});
//	}
//
//	async public load_tokens(): void {
//		console.debug('loading tokens');
//		const cr = this.contracts['bancor_converter_registry'];
//		cr.methods.getConvertibleTokens().call().then(async (addresses) => {
//			this.init.tokens[1] = addresses.length;
//			addresses.forEach(async (address) => {
//				this.add_token(address);
//				console.debug('l ', this.tokens.length, addresses.length);
//				if (this.tokens.length == addresses.length) {
//					this.onload();
//				}
//			});
//		});
//	}
//
//	async add_token(address:string): void {
//		const ct = new this.w3.eth.Contract(this.abis.common['erc20'], address);
//		const symbol = await ct.methods.symbol().call();
//		const name = await ct.methods.name().call();
//		const t = new Token(address, symbol, name);
//		const ti = this.tokens.length;
//		this.tokens.push(t);
//		this.tokens[t.symbol] = this.tokens[ti];
//		this.tokens_r[address] = this.tokens[ti];
//		this.init.tokens[0]++;
//		console.log('added token', t.toString(), ti, address);
//		if (this.init.tokens[0] == this.init.tokens[1]) {
//			this.ontokenload(this.init.tokens[0]);
//		}
//	}
}

export {
	Registry,
}
