import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
	reducer: {
		themeState: themeSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
