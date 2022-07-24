import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { $host } from '../../http';
import { SearchItemProps } from '../../modules/CatalogSearch';
import { IProduct } from '../../types/objects/product';

export interface SearchDropDownState {
	items: SearchItemProps[];
	isLoading: boolean;
	sector: number;
}

export const getSearchItems = createAsyncThunk(
	'getSearchItems',
	async (
		obj: { searchValue: string; sector: number },
		{ rejectWithValue },
	) => {
		try {
			const response: AxiosResponse<IProduct[]> = await $host.get(
				'api/product/search',
				{
					params: {
						query: obj.searchValue,
						sector: obj.sector,
					},
				},
			);

			if (response.status !== 200) {
				throw new Error('Server Error');
			}

			const convertedArr: SearchItemProps[] = [];

			response.data.forEach(el => {
				convertedArr.push({
					value: String(el.id),
					img: el.img ? el.img : '',
					brand: el.brand.name,
					label: el.name,
					price: el.price,
					rating: el.rating,
					type: el.type.name,
				});
			});

			return convertedArr;
		} catch (error) {
			rejectWithValue(error);
		}
	},
);

const initialState: SearchDropDownState = {
	items: [],
	isLoading: false,
	sector: 1,
};

export const searchDropDownSlice = createSlice({
	name: 'searchDropDownSlice',
	initialState,
	reducers: {
		closeSearch: state => {
			state.sector = 1;
			state.items = [];
			state.isLoading = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(getSearchItems.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getSearchItems.fulfilled, (state, action) => {
			state.isLoading = false;
			state.items = action.payload as any;
		});
		builder.addCase(getSearchItems.rejected, () => {});
	},
});

export const { closeSearch } = searchDropDownSlice.actions;
export default searchDropDownSlice.reducer;
