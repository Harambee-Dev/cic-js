import * as assert from 'assert';

import { abiAdd as bancorAbiAdd } from '../src/bancor';
import { abiAdd as commonAbiAdd } from '../src/common';

describe('init', () => {
	it('abi', () => {
		let abi = {};
		let abii = bancorAbiAdd(abi);
		assert.deepEqual(abii, abi);

		let abiii = commonAbiAdd(abi);
		assert.deepEqual(abiii, abi);
	});
});
