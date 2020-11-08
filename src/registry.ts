import { Token } from './common/erc20';

class Registry {

	w3:		any
	address:	string
	abis:		Object
	contracts:	Object
	contracts_r:	Object		// address to contract index
	tokens:		Array<Token>
	tokens_s:	Object		// symbol string to token index
	tokens_r:	Object		// address to token index

	init:		Object

	ontokensload:	(n:number) => void
	onregistryload:	(s:string) => void


	constructor(w3:any, address:string, abis:Object) {
		this.w3 = w3;
		this.abis = abis;
		this.address = address;

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

		this.ontokensload= function(n:number) {
			console.debug('tokens loaded', n);
		}
		this.onregistryload= function(s:string) {
			console.debug('registry loaded');
		}
	}

	// TODO: DRY
	public async load() {
		console.debug('loading registry');

		const cr = this.contracts['bancor_contract_registry'];
		let crid_hex = this.w3.utils.toHex('BancorConverterRegistry');
		let shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
		cr.methods.getAddress(shaid).call().then((address) => {
			const abi = this.abis['bancor']['converter_registry'];
			this.contracts['bancor_converter_registry'] = new this.w3.eth.Contract(abi, address);
			this.contracts_r[address] = this.contracts['bancor_converter_registry'];
			console.log('bancor converter registry', address);
			this.load_tokens();
			this.init['network'][0]++;
			if (this.init['network'][0] == this.init['network'][1]) {
				this.onregistryload(this.address);
			}
		});
		crid_hex = this.w3.utils.toHex('BancorNetwork');
		shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex)
		cr.methods.getAddress(shaid).call().then((address) => {
			this.contracts['bancor_network'] = new this.w3.eth.Contract(this.abis['bancor']['network'], address);
			this.contracts_r[address] = this.contracts['bancor_network'];
			console.log('bancor network', address);
			this.init['network'][0]++;
			if (this.init['network'][0] == this.init['network'][1]) {
				this.onregistryload(this.address);
			}
		});
	}


	public async load_tokens() {
		console.debug('loading tokens');
		const cr = this.contracts['bancor_converter_registry'];
		cr.methods.getConvertibleTokens().call().then(async (addresses) => {
			this.init['tokens'][1] = addresses.length;
			addresses.forEach(async (address) => {
				this.add_token(address).then(() => {
					console.debug('l ', this.tokens.length, addresses.length);
					if (this.tokens.length == addresses.length) {
						this.ontokensload(this.tokens.length);
					}
				}).catch((e) => {
					console.error(e);	
				});
			});
		});
	}

	public async add_token(address:string) {
		const abi = this.abis['common']['erc20'];
		const ct = new this.w3.eth.Contract(abi, address);
		const symbol = await ct.methods.symbol().call();
		const name = await ct.methods.name().call();
		const t = new Token(address, name, symbol);
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
}

export {
	Registry,
}
