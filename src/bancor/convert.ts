const topic_convert = '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095';

class Conversion {
	sourceToken:		string
	destinationToken:	string
	trader:			string
	fromValue:		number
	toValue:		number
	tx:			string

	constructor (tx:string, sourceToken:string, destinationToken:string, trader:string, fromValue:number, toValue:number) {
		this.sourceToken = sourceToken;
		this.destinationToken = destinationToken;
		this.trader = trader;
		this.fromValue = fromValue;
		this.toValue = toValue;
		this.tx = tx;
	}

	static async public processLog(log:Object): Conversion {
		if (log.topics[0] == topics.erc20['convert']) {
			const block = await this.w3.eth.getBlock(log.blockNumber);
			const sourceToken_address = this.w3.utils.toChecksumAddress('0x' + log.topics[1].substring(26, 66));
			const sourceToken = this.registry.tokens_r[sourceToken_address];
			const destinationToken_address = this.w3.utils.toChecksumAddress('0x' + log.topics[2].substring(26, 66));
			const destinationToken = this.registry.tokens_r[destinationToken_address];
			//const fromValue = this.w3.utils.hexToNumber(log.data.substring(0, 66));
			const fromValue = BigInt(log.data.substring(0, 66));
			//const toValue = this.w3.utils.hexToNumber('0x' + log.data.substring(66, 130));
			const toValue = BigInt(log.data.substring(0, 66));
			const trader = this.w3.utils.toChecksumAddress('0x' + log.data.substring(154));
			const tx = new Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);
			const cv = new Conversion(tx, sourceToken, destinationToken, trader, fromValue, toValue);
			this.onconversion(cv);
		}
	}
}

export {
	Conversion,
}
