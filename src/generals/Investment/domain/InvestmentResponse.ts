interface Document {
	name: string;
}

interface Holder {
	name: string;
}

interface InvestmentConcept {
	name: string;
}

interface InvestmentType {
	name: string;
}

interface MeasureUnit {
	name: string;
}

interface MiningConcession {
	name: string;
}

interface periodType {
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
	minigConcession: MiningConcession;
	periodType: periodType;
}
