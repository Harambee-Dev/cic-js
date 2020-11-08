class Tx {

	block:		number
	txIndex:	number
	txHash:		string
	timestamp:	number
	success:	boolean

	constructor (block, tx_index, tx_hash, timestamp, success) {
		this.block = block;
		this.txIndex = tx_index;
		this.txHash = tx_hash;
		this.timestamp = timestamp;
		this.success = success;
	}
}
