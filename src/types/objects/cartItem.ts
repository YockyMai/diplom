import { IProduct } from './product';

export interface ICartItem extends IProduct {
	count: number;
	totalPrice: number;
}
