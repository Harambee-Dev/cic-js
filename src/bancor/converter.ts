import { BN } from 'bn';

class ReserveConnection {
	weight:		number
	balance:	BN
	address:	string

	constructor(address:string, weight:number, balance:BN) {
		this.weight = weight;
		this.balance = balance;
		this.address = address;
	}
}

class Converter {
	reserveRatio:	number
	address:	string
	owner:		string
	reserves:	Array<ReserveConnection>

	constructor(address:string, owner:string, reserveRatio:number, reserves:Array<ReserveConnection>) {
		console.log('owner', owner);
		this.owner = owner;
		this.address = address;
		this.reserves = reserves;
		this.reserveRatio = reserveRatio;
	}
}

export {
	Converter,
	ReserveConnection,
}
