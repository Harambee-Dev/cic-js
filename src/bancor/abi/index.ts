import * as networkAbi from './network.json';
import * as contractRegistryAbi from './contract_registry.json';
import * as converterRegistryAbi from './converter_registry.json';

const abi = {
	'network': networkAbi['default'],
	'contract_registry': contractRegistryAbi['default'],
	'converter_registry': converterRegistryAbi['default'],
}
export {
	abi,
}
