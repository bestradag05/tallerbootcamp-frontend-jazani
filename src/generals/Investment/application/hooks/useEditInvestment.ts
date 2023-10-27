import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentRequest } from '../../domain';
import { InvestmentRepository } from '../../Infraestructure';
import { FIND_BY_ID, PAGINATED_SEARCH } from './QueryKeys';

interface EditInvestmentProps {
	payload: InvestmentRequest;
	id: number;
}

const useEditInvestment = (): UseMutationResult<InvestmentResponse, Error, EditInvestmentProps> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: EditInvestmentProps) =>
			await InvestmentRepository.edit(params.payload, params.id),
		onError: error => {
			console.error('Edit', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useEditInvestment;
