import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { FIND_BY_ID } from './QueryKeys';
import { InvestmentRepository } from '../../Infraestructure';
import { type InvestmentResponse } from '../../domain';

const useFindByIdInvestment = (id?: number): UseQueryResult<InvestmentResponse, Error> => {
	return useQuery({
		queryKey: [FIND_BY_ID, id],
		queryFn: async () => await InvestmentRepository.finById(id ?? 0),
		enabled: id != null,
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export default useFindByIdInvestment;
