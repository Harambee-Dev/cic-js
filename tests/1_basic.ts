const assert = require('assert');

import { abi, bin } from '../src/solidity';
import { FsFileGetter } from '../src/file';

const okPaths = [__dirname, __dirname + '/testdata', __dirname + '/testdata/solidity'];
const failPaths = [__dirname, __dirname + '/testdata'];
const getter = new FsFileGetter();

describe('registry', () => {
	it('abi_files', () => {
		try {
			let b = abi(getter, 'GiftableToken', failPaths);
			assert.fail('expected error');
		} catch {
		}
		let b = abi(getter, 'GiftableToken', okPaths);
	});

	it('bin_files', () => {
		try {
			let j = bin(getter, 'GiftableToken', failPaths);
			assert.fail('expected error');
		} catch {
		}
		let j = bin(getter, 'GiftableToken', okPaths);
	});
});
