import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { $authHost } from '../../http';
import { IProduct } from '../../types/objects/product';

export interface productInfo {
	title: string;
	description: string;
}

export interface productAddSlice {
	price: number;
	filename: string;
	productInfo: productInfo[];
}

const initialState: productAddSlice | any = {};

export const getBrands = createAsyncThunk(
	'productAddSlice/getBrands',
	async (_, { rejectWithValue }) => {
		try {
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const productAddSlice = createSlice({
	name: 'productAddSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {},
});

export default productAddSlice.reducer;
