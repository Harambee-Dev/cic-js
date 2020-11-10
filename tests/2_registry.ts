const assert = require('assert');

const Web3 = require('web3');

import { abi } from '../src/';

import { Registry } from '../src/registry';

const hashOfFoo = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db

// TODO: mock web3
describe('registry', () => {
	it('new', () => {
		const w3 = new Web3();

		const registry = new Registry(w3, '0x' + hashOfFoo.substring(0, 40), abi);
	});

	it('load', () => {
		const w3 = new Web3('http://localhost:8545');

		const registry = new Registry(w3, contractRegistry, abi);

		let tokenCount = undefined;
		let addressReturned = undefined;

		registry.ontokensload = (n) => {
			console.debug('ontoken', n);
			tokenCount = n;
		};
		registry.onregistryload = (a) => {
			console.debug('onregistry', a);
			addressReturned = a;
		};

		// never reaches then block, why?
		registry.load().then(() => {
			console.debug('checking tokencount');
			assert(tokenCount, 3);
			console.debug('checking contract address');
			assert(addressReturned, contractRegistry);
		}).catch((e) => {
			assert.fail(e);	
		});
	});

	it('contracts_list', async () => {
		const w3 = new Web3('http://localhost:8545');

		const registry = new Registry(w3, contractRegistry, abi);

		let tokenCount = undefined;
		let addressReturned = undefined;
	
		const list = await registry.getNetworkContracts();
		console.log(list);
	});

});
