import { Log, Tx } from './tx';

const topics = {
	'transfer': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
};

class Transfer {

	from:	string
	to:	string
	token:	string
	value:	BigInt
	tx:	Tx

	constructor(tx:Tx, token:string, from:string, to:string, value:BigInt) {
		this.from = from;
		this.to = to;
		this.token = token;
		this.value = value;
		this.tx = tx;
	}

	public static async processLog(w3:any, success:boolean, token:string, log:Log) {
		let transfer:Transfer = undefined;
		if (log.topics[0] == topics['transfer']) {
			const block = await w3.eth.getBlock(log.blockNumber);
			const from = w3.utils.toChecksumAddress(log.topics[1].substring(26, 66));
			const to = w3.utils.toChecksumAddress(log.topics[2].substring(26, 66));
			const value = BigInt(log.data);
			const tx = new Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);
			transfer = new Transfer(tx, token, from, to, value);
		}
		return transfer;
	}
}

class Token {

	address:	string
	name:		string
	symbol:		string

	constructor(address:string, name:string, symbol:string) {
		this.address = address;
		this.name = name;
		this.symbol = symbol;
	}

	public toString(): string {
		return 'Token: ' + this.name + ' (' + this.symbol + ')';
	}
}

export {
	Transfer,
	Token,
	topics,
}
