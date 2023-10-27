import { type JSX } from 'react';

import { type InvestmentRequest } from '../../domain';
import useCreateInvestment from '../../application/hooks/useCreateInvestment';
import { useNavigate } from 'react-router';
import FormSave from '../components/FormSave';

const index = (): JSX.Element => {
	// Attributes
	const navigate = useNavigate();
	// React Query

	const { mutateAsync } = useCreateInvestment();

	// Methods

	const createInvestment = async (payload: InvestmentRequest): Promise<void> => {
		try {
			await mutateAsync(payload);
			navigate('/investments');
		} catch (error) {
			console.log('Error create', error);
		}
	};

	return (
		<FormSave
			pageTitle="Registrar"
			onSave={payload => {
				void createInvestment(payload);
			}}
		/>
	);
};

export default index;
