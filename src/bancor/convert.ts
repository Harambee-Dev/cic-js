import { Log, Tx } from '../common/tx';
import { topics as erc20Topics } from '../common/erc20';
import { Registry } from '../registry';

const topic_convert = '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095';


/**
 * Instance represents a single conversion event on network.
 * 
 * @class Conversion
 */
class Conversion {
	sourceToken:		string
	destinationToken:	string
	trader:			string
	fromValue:		BigInt
	toValue:		BigInt
	tx:			Tx

	/**
	 *
	 * @param tx Ethereum transaction
	 * @param sourceToken ERC20 token sent in conversion
	 * @param destinationToken ERC20 token received from conversion
	 * @param trader Ethereum address performing the conversion (sender and recipient)
	 * @param fromValue Source token value of conversion
	 * @param toValue Destination token value of conversion
	 */
	constructor (tx:Tx, sourceToken:string, destinationToken:string, trader:string, fromValue:BigInt, toValue:BigInt) {
		this.sourceToken = sourceToken;
		this.destinationToken = destinationToken;
		this.trader = trader;
		this.fromValue = fromValue;
		this.toValue = toValue;
		this.tx = tx;
	}

	/**
	 * Scans a transaction log for transfer event.
	 *
	 * @static
	 * @param w3 A connected Web3 object
	 * @param registry Registry context of conversion
	 * @param success State of transaction
	 * @param log A Web3 transaction receipt logs array
	 * @return conversion Instance of Conversion if conversion is found, undefined if not.
	 */
	public static async processLog(w3:any, registry:Registry, success: boolean, log:Log) {
		let conversion:Conversion = undefined;
		if (log.topics[0] == topic_convert) {
			const block = await w3.eth.getBlock(log.blockNumber);
			const sourceToken_address = w3.utils.toChecksumAddress('0x' + log.topics[1].substring(26, 66));
			const sourceToken = await registry.getToken(sourceToken_address); 
			const destinationToken_address = w3.utils.toChecksumAddress('0x' + log.topics[2].substring(26, 66));
			const destinationToken = await registry.getToken(destinationToken_address);
			const fromValue = BigInt(log.data.substring(0, 66));
			const toValue = BigInt(log.data.substring(0, 66));
			const trader = w3.utils.toChecksumAddress('0x' + log.data.substring(154));
			const tx = new Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);
			conversion = new Conversion(tx, sourceToken, destinationToken, trader, fromValue, toValue);
			console.log('convert', conversion);
		}
		return conversion;
	}
}

export {
	Conversion,
}
