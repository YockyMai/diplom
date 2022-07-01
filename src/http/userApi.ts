import { $authHost, $host } from '.';

export const registration = (
	email: string,
	password: string,
	username: string,
) => {
	$host.post('api/auth/registration', {
		email,
		password,
		username,
	});

	return;
};
