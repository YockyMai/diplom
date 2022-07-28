import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'zod';
import { $host } from '../../http';
import { IProduct } from '../../types/objects/product';
import { ISearchParams } from '../../types/objects/searchParams';

export interface productsState {
	count: number;
	items: IProduct[];
	itemsIsLoading: boolean;
	product: {
		item: IProduct | null;
		isLoading: boolean;
		status: 'ok' | 'failed' | null;
	};
}

const initialState: productsState = {
	count: 0,
	items: [],
	itemsIsLoading: true,
	product: {
		item: null,
		isLoading: false,
		status: null,
	},
};

export const getAllProducts = createAsyncThunk(
	'/product/getAll',
	async (params: ISearchParams, { rejectWithValue }) => {
		try {
			const limit = 8;
			let {
				brandId,
				typeId,
				minPrice,
				maxPrice,
				currentPage,
				sizeId,
				sortBy,
			} = params;

			const response = await $host.get(`/api/product`, {
				params: {
					brandId: brandId == '0' ? null : brandId,
					typeId: typeId == '0' ? null : typeId,
					sizeId: sizeId == '0' ? null : sizeId,
					limit,
					page: currentPage,
					minPrice,
					maxPrice,
					order: sortBy,
				},
			});

			if (response.status !== 200) {
				throw new Error('Server Error');
			}

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	},
);

export const getOneProduct = createAsyncThunk(
	'product/getOne',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await $host.get(`/api/product/${id}`);

			if (response.status !== 200) {
				throw new Error('Server Error');
			}

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	},
);

export const productSlice = createSlice({
	name: 'productSlice',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllProducts.pending, state => {
			state.itemsIsLoading = true;
		});
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.count = action.payload.count;
			state.items = action.payload.rows;
			state.itemsIsLoading = false;
		});
		builder.addCase(getOneProduct.pending, state => {
			state.product.isLoading = true;
		});
		builder.addCase(getOneProduct.fulfilled, (state, action) => {
			state.product.item = action.payload;
			state.product.isLoading = false;
			state.product.status = 'ok';
		});
		builder.addCase(getOneProduct.rejected, state => {
			state.product.status = 'failed';
		});
	},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
