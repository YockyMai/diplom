import { number } from 'zod';

export interface IProduct {
	id: number;
	name: string;
	price: number;
	rating: number;
	img?: string | null;
	type: {
		id: number;
		name: string;
	};
	brand: {
		id: number;
		name: string;
	};
	sizes: [
		{
			id: string;
			count: number;
			createdAt: string;
			updatedAt: string;
			productId: number;
			sizeId: number;
			size: {
				id: number;
				size: number;
			};
		},
	];
}

export interface IProductInfo {
	id: number;
	title: string;
	description: string;
	productId: string;
	createdAt: string;
	updatedAt: string;
}
