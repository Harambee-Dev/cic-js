const assert = require('assert');

const Web3 = require('web3');

import { CICRegistry } from '../src/registry';

const provider = 'http://localhost:63545';
const hashOfFoo = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db
const dataPath = [__dirname + '/testdata/solidity'];

const tokenDeclarator = '0x5567139c7a1C2977A391f51D8cA45B1D6700f5F6';


// TODO: mock web3
describe('registry', () => {
	it('new', async () => {
		const w3 = new Web3(provider);

		const registry = new CICRegistry(w3, '0x4f8af296202Bff3B8589DA4Af87A8cfe74ad4d3A', dataPath);
		await registry.load();
	});

	it('contract', async () => {
		const w3 = new Web3(provider);

		const registry = new CICRegistry(w3, '0x4f8af296202Bff3B8589DA4Af87A8cfe74ad4d3A', dataPath);
		await registry.load();
		const accountsIndexContract = await registry.getContractByName('AccountRegistry');
		console.log(accountsIndexContract.address);
	});

	it('token', async () => {
		const w3 = new Web3(provider);

		const registry = new CICRegistry(w3, '0x4f8af296202Bff3B8589DA4Af87A8cfe74ad4d3A', dataPath);
		await registry.load();

		//const token = await registry.getTokenByDeclaration('TokenRegistry', tokenDeclarator, 0);
		const token = await registry.getTokenBySymbol('TokenRegistry', 'SFU');

	});

//	await it('load', async () => {
//		const w3 = new Web3('http://localhost:8545');
//
//		const registry = new Registry(w3, contractRegistry, abi);
//
//		let tokenCount = undefined;
//		let addressReturned = undefined;
//
//		registry.ontokensload = (n) => {
//			console.debug('ontoken', n);
//			tokenCount = n;
//			console.debug('checking tokencount', tokenCount);
//			assert(tokenCount, 3);
//		};
//		registry.onregistryload = (a) => {
//			console.debug('onregistry', a);
//			addressReturned = a;
//			console.debug('checking contract address');
//			assert(addressReturned, contractRegistry);
//		};
//
//		// never reaches then block, why?
//		await registry.load(true);
//	});
//
//	await it('contracts_list', async () => {
//		const w3 = new Web3('http://localhost:8545');
//
//		const registry = new Registry(w3, contractRegistry, abi);
//
//		let tokenCount = undefined;
//		let addressReturned = undefined;
//	
//		const list = await registry.getNetworkContracts();
//		console.log(list);
//	});


});
