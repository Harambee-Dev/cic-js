const assert = require('assert');

import { abi, bin } from '../src/solidity';

const okPaths = [__dirname, __dirname + '/testdata', __dirname + '/testdata/solidity'];
const failPaths = [__dirname, __dirname + '/testdata'];

describe('registry', () => {
	it('abi_files', () => {
		try {
			let b = abi('GiftableToken', failPaths);
			assert.fail('expected error');
		} catch {
		}
		let b = abi('GiftableToken', okPaths);
	});

	it('bin_files', () => {
		try {
			let j = bin('GiftableToken', failPaths);
			assert.fail('expected error');
		} catch {
		}
		let j = bin('GiftableToken', okPaths);
	});
});
