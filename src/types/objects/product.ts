export interface IProduct {
	id: string;
	title: string;
	image?: string;
	price: number;
	discountPercent?: number;
	category: 'woman' | 'male' | 'child';
}
