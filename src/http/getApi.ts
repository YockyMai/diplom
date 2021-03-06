import { showNotification } from '@mantine/notifications';
import { AxiosResponse } from 'axios';
import { $host } from '.';
import { IBrand } from '../types/objects/brand';
import { IProductInfo } from '../types/objects/product';
import { validError } from '../utils/validError';

export const getBrands = async () => {
	try {
		const response: AxiosResponse<IBrand[]> = await $host.get('api/brand/');

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		showNotification({
			color: 'red',
			title: 'Ошибка!',
			message: 'Попробуйте позже',
		});
	}
};

export const getTypes = async () => {
	try {
		const response: AxiosResponse<IBrand[]> = await $host.get('api/type/');

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		showNotification({
			color: 'red',
			title: 'Ошибка!',
			message: 'Попробуйте позже',
		});
	}
};

export const getSizes = async () => {
	try {
		const response = await $host.get('api/sizes/');

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		showNotification({
			color: 'red',
			title: 'Ошибка!',
			message: 'Попробуйте позже',
		});
	}
};

export const getProductInfo = async (productId: number) => {
	const response: AxiosResponse<IProductInfo[]> = await $host.get(
		`api/product/info/${productId}`,
	);

	return response.data;
};

export const getUserStars = async (productId: number, userId: number) => {
	const response: AxiosResponse<{ rate: number }> = await $host.get(
		`api/comment/stars/${productId}/${userId}`,
	);

	return response.data;
};

export const getOneProduct = async (productId: string) => {
	try {
		const response = await $host.get(`/api/product/${productId}`);

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		validError('Серверная ошибка, попробуйте позже!');
	}
};
