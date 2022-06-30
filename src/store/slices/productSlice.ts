import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types/objects/product';

export interface productsState {
	items: IProduct[];
}

const initialState: productsState = {
	items: [
		{
			id: '1',
			title: 'PUMA TRC Blaze',
			price: 12999,
			category: 'male',
			image: 'https://static.street-beat.ru/upload/resize_cache/iblock/037/500_500_1/0379c964f754b0276dc48ba97ddb3bad.jpg',
		},
		{
			id: '2',
			title: 'Reebok Classic Club C 85',
			price: 10999,
			category: 'male',
			image: 'https://static.street-beat.ru/upload/resize_cache/iblock/408/500_500_1/4085f347fa8f700a3f7b35e24215d4d4.jpg',
		},
		{
			id: '3',
			title: 'Adidas Originals Ozelia',
			price: 11999,
			category: 'male',
			image: 'https://static.street-beat.ru/upload/resize_cache/iblock/caa/500_500_1/caa42489e39beeb9d64b54f4a7078182.jpg',
			discountPercent: 3,
		},
	],
};

export const productSlice = createSlice({
	name: 'productSlice',
	initialState,
	reducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
