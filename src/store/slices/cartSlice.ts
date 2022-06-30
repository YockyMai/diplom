import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../types/objects/cartItem';

export interface cartState {
	items: ICartItem[];
	totalPrice: number;
	totalCount: number;
}

const initialState: cartState = {
	items: [],
	totalPrice: 0,
	totalCount: 0,
};

export const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		payment: () => {},
		addToCart: (state, action: PayloadAction<ICartItem>) => {
			state.items.push(action.payload);
			state.totalPrice = state.totalPrice + action.payload.price;
			++state.totalCount;
		},
		addOneItem: (state, action: PayloadAction<ICartItem>) => {
			state.items.forEach(el => {
				if (el.id === action.payload.id) {
					el.count = ++el.count;
					el.totalPrice = el.totalPrice + el.price;
					state.totalPrice = state.totalPrice + el.price;
					++state.totalCount;
				}
			});
		},
		awayOneItem: (state, action: PayloadAction<ICartItem>) => {
			state.items.forEach(el => {
				if (el.id === action.payload.id && el.count > 1) {
					el.count = --el.count;
					el.totalPrice = el.totalPrice - el.price;
					state.totalPrice = state.totalPrice - el.price;
					--state.totalCount;
				}
			});
		},
	},
});

export const { payment, addToCart, addOneItem, awayOneItem } =
	cartSlice.actions;
export default cartSlice.reducer;
