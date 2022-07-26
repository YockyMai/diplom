import { showNotification } from '@mantine/notifications';
import { AxiosResponse } from 'axios';
import { $authHost } from '.';
import { validError } from '../utils/validError';

export const createProduct = async (
	name: string,
	price: string,
	brandId: string,
	typeId: string,
	info: { title: string; description: string }[],
	filename: string,
) => {
	try {
		const formData = new FormData();

		formData.append('name', name);
		formData.append('price', price);
		formData.append('brandId', brandId);
		formData.append('typeId', typeId);
		formData.append('info', JSON.stringify(info));
		formData.append('fileName', filename);

		const response = await $authHost.post('api/product', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {}
};

export const addSizesToProduct = async (
	productId: string,
	sizesData: { count: number; sizeId: number }[],
) => {
	try {
		const response = await $authHost.post('api/sizes/', {
			productId,
			sizesData,
		});

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		showNotification({
			title: 'Ошибка!',
			color: 'red',
			message: 'Не удалось добавить размер',
		});
	}
};

export const createBrand = async (brandName: string) => {
	const res = await $authHost.post('/api/brand/', {
		name: brandName,
	});

	return res.data;
};

export const deleteBrand = async (brandId: string) => {
	const res = await $authHost.post('/api/brand/delete', {
		brandId,
	});

	return res.data;
};

export const deleteProduct = async (productId: string) => {
	try {
		const response = await $authHost.post('/api/product/delete/', {
			productId,
		});

		if (response.status !== 200) {
			throw new Error('Server Error');
		}

		return response.data;
	} catch (error) {
		validError('Такого товара уже не существует!');
	}
};
