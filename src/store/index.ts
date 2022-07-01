import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';
import themeSlice from './slices/themeSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
	reducer: {
		themeState: themeSlice,
		productsState: productSlice,
		cartState: cartSlice,
		userState: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
