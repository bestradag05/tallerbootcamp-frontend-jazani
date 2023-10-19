import type SecurityResponse from './SecurityResponse';

export default interface UserSecurityResponse {
	id: number;
	name: string;
	lastName: string;
	email: string;
	password: string;
	roleId: number;
	registrationDate: Date;
	state: boolean;
	security: SecurityResponse;
}
