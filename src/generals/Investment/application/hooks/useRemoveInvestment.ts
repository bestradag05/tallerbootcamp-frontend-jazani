import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { type InvestmentResponse } from '../../domain';
import { InvestmentRepository } from '../../Infraestructure';
import { FIND_BY_ID, PAGINATED_SEARCH } from './QueryKeys';

const useRemoveInvestment = (): UseMutationResult<InvestmentResponse, Error, number> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => await InvestmentRepository.remove(id),
		onError: error => {
			console.error('Error', error);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
			void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
		},
	});
};

export default useRemoveInvestment;
