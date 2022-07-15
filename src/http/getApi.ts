import { showNotification } from '@mantine/notifications';
import { AxiosResponse } from 'axios';
import { $host } from '.';
import { IProductInfo } from '../types/objects/product';

export const getBrands = async () => {
	try {
		const response = await $host.get('api/brand/');

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
		const response = await $host.get('api/type/');

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
