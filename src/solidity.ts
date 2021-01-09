const path = require('path');

import { EVMMethodID } from './typ';
import { FileGetter } from './file';

const interfaceCodes = {
	ERC20: '1da30d20',
	Registry: '325d15e2',
	Declarator: '00000000', // TODO: calculate
};

async function abi(fileGetter:FileGetter, interface_name:string, paths:string[]): Promise<Object> {
	const d = await findInPath(fileGetter, interface_name, 'json', paths);
	return JSON.parse(d);
}

async function bin(fileGetter:FileGetter, interface_name:string, paths:string[]): Promise<string> {
	const d = await findInPath(fileGetter, interface_name, 'bin', paths);
	return new TextDecoder('utf-8').decode(d);
}

async function findInPath(fileGetter:FileGetter, stem:string, extension:string, paths:string[]): Promise<any> {
	const filename = stem + '.' + extension;
	let found = false;
	if (paths === undefined) {
		try {
			return await fileGetter.get(filename);
		} catch(e) {
			console.error(e);
		}
	} else {
		for (let i = 0; i < paths.length; i++) {
			const filePath = path.join(paths[i], filename);
			let d;
			console.debug('findInPath search ' + filePath);
			try {
				return await fileGetter.get(filePath);
			} catch(e) {
				console.error(e);
				continue;
			}
		}
	}
	if (!found) {
		throw new Error('file ' + filename + ' not found in data path');
	}
}

export {
	abi,
	bin,
	interfaceCodes,
}
