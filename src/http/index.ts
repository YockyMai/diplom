import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const $host = axios.create({
	baseURL: 'http://localhost:7096/',
});

const $authHost = axios.create({
	baseURL: 'http://localhost:7096/',
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
