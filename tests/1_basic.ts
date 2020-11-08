const assert = require('assert');

import { abi } from '../src/';

describe('registry', () => {
	it('abi', () => {
		assert.notEqual(abi['bancor'], undefined);
		assert.notEqual(abi['common'], undefined);
	});
});
