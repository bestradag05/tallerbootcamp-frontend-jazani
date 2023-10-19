import { type UserSecurityResponse } from '@/auth/login/domain';

const STORAGE_OF_AUTORIZATION = 'STORAGE_OF_APP';

export const saveAutorizathion = (payload: UserSecurityResponse): void => {
	localStorage.setItem(STORAGE_OF_AUTORIZATION, JSON.stringify(payload));
};

export const getAutorizathion = (): UserSecurityResponse => {
	const data = localStorage.getItem(STORAGE_OF_AUTORIZATION);

	if (data == null) throw new Error('Required Login');

	return JSON.parse(data);
};

export const removeAutorizathion = (): void => {
	localStorage.removeItem(STORAGE_OF_AUTORIZATION);
};

export const existAutorizathion = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTORIZATION);
	if (data != null) return true;

	return false;
};

export const isValidAutorizathion = (): boolean => {
	const data = localStorage.getItem(STORAGE_OF_AUTORIZATION);

	if (data == null) return false;

	const user: UserSecurityResponse = JSON.parse(data);

	if (user.security?.expireOn.length === 0) return false;

	const expireOn = new Date(user.security.expireOn);
	const currentDate = new Date();

	return expireOn > currentDate;
};
