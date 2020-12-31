const assert = require('assert');

const Web3 = require('web3');

import { abi } from '../src';

import { Registry } from '../src/registry';
import { TransactionHelper } from '../src/helper';

const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db

describe('helper', () => {
	it('new', () => {
		const w3 = new Web3('http://localhost:8545');

		const registry = new Registry(w3, contractRegistry, abi);

		const helper = new TransactionHelper(registry);
	});
});	
