import { Registry } from './registry';
import { Transfer } from './common/erc20';
import { Conversion } from './bancor/convert';

// TODO: Is there a way of importing the web3 type instead?
class Receipt {
	logs:	Array<any>
	status:	boolean

}

class TransactionHelper {

	w3:		any
	registry:	Registry
	ontransfer:	(Transfer) => void
	onconversion:	(Conversion) => void

	constructor(registry:Registry) {
		this.w3 = registry.w3;
		this.registry = registry;

		this.ontransfer = (t) => {
			console.debug('transfer ', t);
		}
		this.onconversion = (c) => {
			console.debug('convert ', c);
		}
	}

	public async processReceipt(r:Receipt) {
		const self = this;
		const logs = r.logs;
		// TODO: Improve (vastly) by inspecting bloom filter instead
		// TODO: Double check that convert was called on bancornetwork if found
		let convert_log = undefined;
		let token_txs = [];
		for (let i = 0; i < logs.length; i++) {
			const contract_address = logs[i].address;
			if (this.registry.contracts_r[contract_address] !== undefined) {
				convert_log = logs[i];
				console.debug('found bancornetwork tx');
				break;
			} else {
				const t = this.registry.tokens_r[contract_address];
				if (t !== undefined) { // need to check arg on
					token_txs.push([r.status, t, logs[i]]);
				}
			}
		}
		if (convert_log !== undefined) {
			const conversion = await Conversion.processLog(this.w3, this.registry, r.status, convert_log);
			if (conversion !== undefined) {
				this.onconversion(conversion);
			}
		} else {
			token_txs.forEach(async (a) => {
				const transfer = await Transfer.processLog(this.w3, a[0], a[1], a[2]); 
				if (transfer !== undefined) {
					this.ontransfer(transfer);
				}
			});
		}
	}
}

export {
	TransactionHelper,
}
