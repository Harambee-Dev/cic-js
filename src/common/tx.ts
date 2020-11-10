/**
 * Abstractions of Web3 transactions and transaction receipt logs
 *
 * @module tx
 */


/**
 * Instance encapsulates metadata of a single mined transaction.
 *
 * @class Tx
 */
class Tx {

	block:		number
	txIndex:	number
	txHash:		string
	timestamp:	number
	success:	boolean

	/**
	 *
	 * @param block Block number
	 * @param txIndex Transaction index in block
	 * @param txHash Transaction hash
	 * @param timestamp Block timestamp
	 * @param success Whether transaction was successful
	 */
	constructor (block:number, txIndex:number, txHash:string, timestamp:number, success:boolean) {
		this.block = block;
		this.txIndex = txIndex;
		this.txHash = txHash;
		this.timestamp = timestamp;
		this.success = success;
	}
}

/**
 * Represents a single Web3 transaction receipt Log entry
 *
 * @class Log
 * @todo Should be changed to type def instead
 */
class Log {
	topics:			Array<any>
	data:			string
	blockNumber:		number
	transactionIndex:	number
	transactionHash:	string
}

export {
	Tx,
	Log,
}
