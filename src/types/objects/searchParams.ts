export interface ISearchParams {
	searchValue?: string;
	typeId?: string;
	brandId?: string;
	currentPage?: string;
	minPrice?: number;
	maxPrice?: number;
	sizeId?: string;
	sortBy?: 'priceDESC' | 'priceASC' | 'ratingDESC' | 'ratingASC';
}
