import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentResponse, type InvestmentRequest } from '../../domain';
import { InvestmentRepository } from '../../Infraestructure';
import { FIND_BY_ID, PAGINATED_SEARCH } from './QueryKeys';

const useCreateInvestment = (): UseMutationResult<InvestmentResponse, Error, InvestmentRequest> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: InvestmentRequest) => await InvestmentRepository.create(payload),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useCreateInvestment;
