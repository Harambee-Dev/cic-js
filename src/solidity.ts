const fs = require('fs');
const path = require('path');

import { EVMMethodID } from './typ';

const interfaceCodes = {
	ERC20: '1da30d20',
	Registry: '325d15e2',
	Declarator: '00000000', // TODO: calculate
};

function abi(interface_name:string, paths:string[]): Object {
	const d = findInPath(interface_name, 'json', paths);
	return JSON.parse(d);
}

function bin(interface_name:string, paths:string[]): string {
	const d = findInPath(interface_name, 'bin', paths);
	return new TextDecoder('utf-8').decode(d);
}

function findInPath(stem:string, extension:string, paths:string[]): any {
	const filename = stem + '.' + extension;
	let found = false;
	for (let i = 0; i < paths.length; i++) {
		const filePath = path.join(paths[i], filename);
		let d;
		console.debug('findInPath search ' + filePath);
		try {
			return fs.readFileSync(filePath); //, {encoding: 'utf-8'});
		} catch {
			continue;
		}
	}
	if (!found) {
		throw 'file ' + filename + ' not found in data path';
	}
}

export {
	abi,
	bin,
	interfaceCodes,
}
