import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export const $SERVER_URL = 'https://pgdatabasediplom.herokuapp.com/';

const $host = axios.create({
	baseURL: $SERVER_URL,
});

const $authHost = axios.create({
	baseURL: $SERVER_URL,
});

interface myAxiosHeaders extends AxiosRequestHeaders {
	authorization: string;
}

const authInterceptor = (config: AxiosRequestConfig) => {
	(
		config.headers as myAxiosHeaders
	).authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
