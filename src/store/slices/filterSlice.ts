import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchParams } from '../../types/objects/searchParams';

export interface filterSlice {
	searchValue: string;
	typeId: string;
	brandId: string;
	currentPage: string;
	minPrice: number;
	maxPrice: number;
}

const initialState: filterSlice = {
	searchValue: '',
	typeId: '0',
	brandId: '0',
	currentPage: '1',
	minPrice: 0,
	maxPrice: 100000,
};

export const filterSlice = createSlice({
	name: 'filterSlice',
	initialState,
	reducers: {
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setCategoryId: (state, action) => {
			state.typeId = action.payload;
		},
		setBrandId: (state, action) => {
			state.brandId = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<ISearchParams>) => {
			state.brandId = action.payload.brandId || '0';
			state.currentPage = action.payload.currentPage || '1';
			state.searchValue = action.payload.searchValue || '';
			state.typeId = action.payload.typeId || '0';
			state.minPrice = action.payload.minPrice || 0;
			state.maxPrice = action.payload.maxPrice || 100000;
		},
		setPriceRange: (
			state,
			action: PayloadAction<[minPrice: number, maxPrice: number]>,
		) => {
			state.minPrice = action.payload[0];
			state.maxPrice = action.payload[1];
		},
		resetFilters: state => {
			state.brandId = '0';
			state.currentPage = '1';
			state.searchValue = '';
			state.typeId = '0';
			state.minPrice = 0;
			state.maxPrice = 100000;
		},
	},
});

export const {
	setSearchValue,
	setCategoryId,
	setBrandId,
	setCurrentPage,
	setFilters,
	resetFilters,
	setPriceRange,
} = filterSlice.actions;

export default filterSlice.reducer;
