const assert = require('assert');

const Web3 = require('web3');

import { abiAdd as bancorAbiAdd } from '../src/bancor';
import { abiAdd as commonAbiAdd } from '../src/common';
import { Registry } from '../src/registry';
import { TransactionHelper } from '../src/helper';

const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db

describe('helper', () => {
	it('new', () => {
		const w3 = new Web3('ws://localhost:8545');

		let abis = {};
		bancorAbiAdd(abis);
		commonAbiAdd(abis);

		const registry = new Registry(w3, contractRegistry, abis);

		const helper = new TransactionHelper(registry);
	});
});	
