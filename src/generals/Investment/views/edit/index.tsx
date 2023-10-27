import { type JSX } from 'react';
import FormSave from '../components/FormSave';
import { type InvestmentRequest } from '../../domain';
import { useNavigate, useParams } from 'react-router';
import useEditInvestment from '../../application/hooks/useEditInvestment';
import { number } from 'yup';

const index = (): JSX.Element => {
	const { id } = useParams();

	// Attributes
	const navigate = useNavigate();
	// React Query
	const { mutateAsync } = useEditInvestment();
	// Methods

	const editInvestment = async (payload: InvestmentRequest): Promise<void> => {
		try {
			await mutateAsync({ payload, id: Number(id) });
			navigate('/investments');
		} catch (error) {
			console.log('Error edit: ', error);
		}
	};

	return (
		<FormSave
			id={Number(id)}
			pageTitle="Editar"
			onSave={payload => {
				void editInvestment(payload);
			}}
		/>
	);
};

export default index;
