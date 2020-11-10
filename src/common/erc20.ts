/**
 * Provides a representation of a token transfer transaction, aswell as a processor to detect transfer events.
 *
 * @module erc20
 */

import { Log, Tx } from './tx';

const topics = {
	'transfer': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
};


/**
 * A Transfer instance represents a single ERC20 token transfer.
 *
 * @class Transfer
 */
class Transfer {

	from:	string
	to:	string
	token:	string
	value:	BigInt
	tx:	Tx

	/**
	 *
	 * @param tx A transaction object
	 * @param token Ethereum address of ERC20 token transferred
	 * @param from Ethereum address of sender
	 * @param to Ethereum address of receipient
	 * @param value Value of transfer
	 */
	constructor(tx:Tx, token:string, from:string, to:string, value:BigInt) {
		this.from = from;
		this.to = to;
		this.token = token;
		this.value = value;
		this.tx = tx;
	}

	/**
	 * Scans a transaction log for transfer event.
	 *
	 * @static
	 * @param w3 A connected Web3 object
	 * @param success State of transaction
	 * @param token Token address to find transfer for
	 * @param log A Web3 transaction receipt logs array
	 * @return transfer Instance of Transfer if transfer is found, undefined if not.
	 */
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

/**
 * Metadata for a single ERC20 token.
 *
 * @class Token
 *
 */
class Token {

	address:	string
	name:		string
	symbol:		string

	/**
	 *
	 * @param address Ethereum address of token contract
	 * @param name ERC20 token name
	 * @param symbol ERC20 token symbol
	 */
	constructor(address:string, name:string, symbol:string) {
		this.address = address;
		this.name = name;
		this.symbol = symbol;
	}

	/**
	 * Informal string representation of token.
	 *
	 */
	public toString(): string {
		return 'Token: ' + this.name + ' (' + this.symbol + ')';
	}
}

export {
	Transfer,
	Token,
	topics,
}
