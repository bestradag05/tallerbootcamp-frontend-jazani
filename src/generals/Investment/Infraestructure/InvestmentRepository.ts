import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { stringify } from 'qs';
import { type InvestmentFilter, type InvestmentResponse } from '../domain';
import { type ResponsePagination, type RequestPagination } from '@/shared/domain';

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMTdhZWNkOS1kNjgzLTQ5NGEtYTNmYy1kMDNlZGMwODMxNjQiLCJpYXQiOiIxNy8xMC8yMDIzIDAyOjM4OjU1IiwibmJmIjoxNjk3NTEwMzM1LCJleHAiOjE2OTc1OTY3MzV9.CV5U5_7i2xxufO16adoBfzKL_lYnPcZ_ED-lN8iz25M */
export const findAll = async (): Promise<InvestmentResponse[]> => {
	console.log(API_BASE_URL);
	const response: AxiosResponse<InvestmentResponse[]> = await axios.get<InvestmentResponse[]>(
		`${API_BASE_URL}/api/investment`
	);

	return response.data;
};

export const paginatedSearch = async (
	payload: RequestPagination<InvestmentFilter>
): Promise<ResponsePagination<InvestmentResponse>> => {
	const queryParams: string = stringify(payload, { allowDots: true });

	const response: AxiosResponse<ResponsePagination<InvestmentResponse>> = await axios.get<
		ResponsePagination<InvestmentResponse>
	>(`${API_BASE_URL}/api/investment/paginatedsearch?${queryParams}`);

	return response.data;
};
