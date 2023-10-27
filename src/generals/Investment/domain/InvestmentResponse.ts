interface Document {
	id: number;
	name: string;
}

interface Holder {
	id: number;
	name: string;
}

interface InvestmentConcept {
	id: number;
	name: string;
}

interface InvestmentType {
	id: number;
	name: string;
}

interface MeasureUnit {
	id: number;
	name: string;
}

interface MiningConcession {
	id: number;
	name: string;
}

interface periodType {
	id: number;
	name: string;
}

export default interface InvestmentResponse {
	id: number;
	amountInvestd: number;
	year: number;
	description: string;
	accountantCode: string;
	currencyTypeId: number;
	declaredTypeId: number;
	registrationDate: Date;
	state: boolean;
	document: Document;
	holder: Holder;
	investmentConcept: InvestmentConcept;
	investmentType: InvestmentType;
	measureUnit: MeasureUnit;
	miningConcession: MiningConcession;
	periodType: periodType;
}
