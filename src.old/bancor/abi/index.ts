import * as networkAbi from './network.json';
import * as contractRegistryAbi from './contract_registry.json';
import * as converterRegistryAbi from './converter_registry.json';
import * as converterAbi from './converter.json';

const abi = {
	'network': networkAbi['default'],
	'contract_registry': contractRegistryAbi['default'],
	'converter_registry': converterRegistryAbi['default'],
	'converter': converterAbi['default'],
}
export {
	abi,
}
