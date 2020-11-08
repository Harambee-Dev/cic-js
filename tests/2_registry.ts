const Web3 = require('web3');

import { abiAdd as bancorAbiAdd } from '../src/bancor';
import { Registry } from '../src/registry';

const hashOfFoo = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db

// TODO: mock web3
describe('registry', () => {
	it('new', () => {
		const w3 = new Web3();

		let abis = {};
		bancorAbiAdd(abis);

		const registry = new Registry(w3, '0x' + hashOfFoo.substring(0, 40), abis);
	});

	it('load', () => {
		const w3 = new Web3();

		let abis = {};
		bancorAbiAdd(abis);

		const registry = new Registry(w3, '0x' + hashOfFoo.substring(0, 40), abis);
	});
});
