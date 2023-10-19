import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { login } from '@/auth/login/infraestructure/LoginRepository';
import { type LoginRequest, type UserSecurityResponse } from '../../domain';

const useLogin = (): UseMutationResult<UserSecurityResponse, Error, LoginRequest> => {
	return useMutation({
		mutationFn: async (payload: LoginRequest) => await login(payload),
	});
};

export default useLogin;
