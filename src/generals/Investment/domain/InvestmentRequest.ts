export default interface InvestmentRequest {
	amountInvestd: number;
	year: number;
	description: string;
	accountantCode: string;
	documentId: number;
	holderId: number;
	declaredTypeId: number;
	investmentConceptId: number; 
	investmentTypeId: number;
	currencyTypeId: number;
	measureUnitId: number;
	miningConcessionId: number;
	periodTypeId: number;
}
