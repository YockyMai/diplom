import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';
import filterSlice from './slices/filterSlice';
import orderSlice from './slices/orderSlice';

export const store = configureStore({
	reducer: {
		themeState: themeSlice,
		productsState: productSlice,
		cartState: cartSlice,
		userState: userSlice,
		filterState: filterSlice,
		orderState: orderSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
