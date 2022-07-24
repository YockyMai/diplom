import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchParams } from '../../types/objects/searchParams';

export interface filterSlice {
	typeId: string;
	brandId: string;
	currentPage: string;
	minPrice: number;
	maxPrice: number;
	sizeId: string;
	sortBy: 'priceDESC' | 'priceASC' | 'ratingDESC' | 'ratingASC';
}

const initialState: filterSlice = {
	typeId: '0',
	brandId: '0',
	currentPage: '1',
	minPrice: 0,
	maxPrice: 100000,
	sizeId: '0',
	sortBy: 'priceDESC',
};

export const filterSlice = createSlice({
	name: 'filterSlice',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.typeId = action.payload;
		},
		setBrandId: (state, action) => {
			state.brandId = action.payload;
		},
		setSizeId: (state, action) => {
			state.sizeId = action.payload;
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<ISearchParams>) => {
			state.brandId = action.payload.brandId || '0';
			state.currentPage = action.payload.currentPage || '1';
			state.typeId = action.payload.typeId || '0';
			state.minPrice = action.payload.minPrice || 0;
			state.maxPrice = action.payload.maxPrice || 100000;
			state.sizeId = action.payload.sizeId || '0';
			state.sortBy = action.payload.sortBy || 'priceDESC';
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
			state.typeId = '0';
			state.sizeId = '0';
			state.minPrice = 0;
			state.maxPrice = 100000;
			state.sortBy = 'priceDESC';
		},
	},
});

export const {
	setCategoryId,
	setBrandId,
	setSizeId,
	setCurrentPage,
	setFilters,
	resetFilters,
	setPriceRange,
	setSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;
