import { Transfer } from './common/erc20';
import { Convert } from './bancor/convert';

class TransactionHelper {

	registry:	Registry
	w3:		Web3
	ontransfer:	(Transfer) => void
	onconversion:	(Convert) => void

	constructor(w3, registry) {
		this.w3 = w3;
		this.registry = registry;

		this.ontransfer = (t) => {
			console.debug('transfer ', t);
		}
		this.onconversion = (c) => {
			console.debug('convert ', c);
		}
	}

	async public processReceipt(r:Object) {
		const logs = r.logs;
		// TODO: Improve (vastly) by inspecting bloom filter instead
		// TODO: Double check that convert was called on bancornetwork if found
		let convert_log = undefined;
		let token_txs = [];
		for (let i = 0; i < logs.length; i++) {
			const contract_address = logs[i].address;
			console.log('contr', this.registry.contracts_r[contract_address]);
			if (this.registry.contracts_r[contract_address] !== undefined) {
				convert_log = logs[i];
				console.debug('found bancornetwork tx');
				break;
			} else {
				const t = this.registry.tokens_r[contract_address];
				if (t !== undefined) {
					token_txs.push([r.status, t, logs[i]]);
				}
			}
		}
		if (convert_log !== undefined) {
			this.processConvertTransactionLog(r.status, convert_log);
		} else {
			token_txs.forEach(function(a) {
				this.processTokenTransactionLog(a[0], a[1], a[2]);
			});
		}
	}
}
