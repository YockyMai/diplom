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
	info?: [];
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
