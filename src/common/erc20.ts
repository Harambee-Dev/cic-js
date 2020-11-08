const topics = {
	erc20: {
		'transfer': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
	}
};

class Transfer {

	from:	string
	to:	string
	token:	string
	value:	BigInt
	tx:	string

	constructor(tx:string, token:string, from:String, to:string, value:number) {
		this.from = from;
		this.to = to;
		this.token = token;
		this.value = value;
		this.tx = tx;
	}
}

class Token {

	address:	string
	name:		string
	symbol:		string

	constructor(address,string, name:string, symbol:string) {
		this.address = address;
		this.name = name;
		this.symbol = symbol;
	}

	public toString(): string {
		return 'Token: ' + this.name + ' (' + this.symbol + ')';
	}

	async static public processLog(log:Object): Transfer {
		if (log.topics[0] == topics.erc20['transfer']) {
			const block = await self.w3.eth.getBlock(log.blockNumber);
			const from = self.w3.utils.toChecksumAddress(log.topics[1].substring(26, 66));
			const to = self.w3.utils.toChecksumAddress(log.topics[2].substring(26, 66));
			//const value = self.w3.utils.hexToNumber(log.data);
			const value = BigInt(log.data);
			const tx = new Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);
			const transfer = new Transfer(tx, t, from, to, value);
			//self.ontransfer(transfer);
		}
	}
}

export {
	Transfer,
	Token,
}
