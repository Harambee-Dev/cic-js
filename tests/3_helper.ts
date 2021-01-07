const assert = require('assert');

const Web3 = require('web3');

import { CICRegistry } from '../src/registry';
import { TransactionHelper } from '../src/helper';
import { FsFileGetter } from '../src/file';

const dataPath = [__dirname + '/testdata/solidity'];
const contractRegistry = '0xb708175e3f6Cd850643aAF7B32212AFad50e2549'; // address when deploying to ganache with provided db
const getter = new FsFileGetter();

describe('helper', () => {
	it('new', () => {
		const w3 = new Web3('http://localhost:63545');

		const registry = new CICRegistry(w3, '0x4f8af296202Bff3B8589DA4Af87A8cfe74ad4d3A', getter, dataPath);

		const helper = new TransactionHelper(w3, registry);
	});
});	
