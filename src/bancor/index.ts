const abiFiles = [
	'bancor_network',
	'contract_registry',
	'converter_registry',
]

function abiAdd(abi:Object): Object {
	try {
		window !== undefined;
	} catch {
	
		console.log('window not set, in nodejs context');
		const fs = require('fs');
		const path = require('path');
		const abiDir = __dirname + '/abi';
		abi['bancor'] = {}
		abiFiles.forEach((k) => {
			const d = fs.readFileSync(path.join(abiDir, k + '.json'), 'utf-8');
			abi['bancor'][k] = JSON.parse(d);
		});
	}
	return abi;
}


export {
	abiAdd,
}
