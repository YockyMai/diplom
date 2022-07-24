import {
	Button,
	Group,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Stack,
	Title,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import qs from 'qs';
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { getBrands, getTypes } from '../http/getApi';
import {
	resetFilters,
	setBrandId,
	setCategoryId,
	setCurrentPage,
	setFilters,
	setSizeId,
	setSortBy,
} from '../store/slices/filterSlice';
import { getAllProducts } from '../store/slices/productSlice';
import { MyRangeSlider } from './MyRangeSlider';

interface Catalog {
	category?: string;
}

const spareTypes = [
	{ value: '0', label: 'Без разницы' },
	{ value: '1', label: 'Мужская обувь' },
	{ value: '2', label: 'Женская обувь' },
	{ value: '3', label: 'Детская обувь' },
];

const spareBrands = [
	{ value: '0', label: 'Без разницы' },
	{ value: '1', label: 'Nike' },
	{ value: '2', label: 'Adidas' },
	{ value: '3', label: 'New Balance' },
	{ value: '4', label: 'Котофей' },
];

const sizeData = [
	{ value: '0', label: 'Без разницы' },
	{ value: '1', label: '36' },
	{ value: '2', label: '37' },
	{ value: '3', label: '38' },
	{ value: '4', label: '39' },
	{ value: '5', label: '40' },
];

const sortData = [
	{
		value: 'priceDESC',
		label: 'Сначала дорогие',
		group: 'Сортировка по цене',
	},
	{
		value: 'priceASC',
		label: 'Сначала дешёвые',
		group: 'Сортировка по цене',
	},
	{
		value: 'ratingDESC',
		label: 'Сначала больше рейтинга',
		group: 'Сортировка по рейтингу',
	},
	{
		value: 'ratingASC',
		label: 'Сначала меньше рейтинга',
		group: 'Сортировка по рейтингу',
	},
];

interface CatalogFilter {
	searchParams: string;
	setSearchParams: Dispatch<SetStateAction<string>>;
}

export const CatalogFilter: FC<CatalogFilter> = ({
	searchParams,
	setSearchParams,
}) => {
	const [brandData, setBrandData] = useState<SelectItem[]>([]);
	const [typeData, setTypeData] = useState<SelectItem[]>([]);

	const dispatch = useAppDispatch();

	const { brandId, typeId, currentPage, minPrice, maxPrice, sizeId, sortBy } =
		useAppSelector(state => state.filterState);

	const navigate = useNavigate();

	useEffect(() => {
		getBrands()
			.then(brands => {
				const convertedArr: SelectItem[] = [];

				brands?.forEach(brandItem => {
					convertedArr.push({
						value: String(brandItem.id),
						label: brandItem.name,
					});
				});

				setBrandData([
					{ value: '0', label: 'Без разницы' },
					...convertedArr,
				]);
			})
			.catch(() => {
				setBrandData([
					{ value: '0', label: 'Без разницы' },
					...spareBrands,
				]);
			});

		getTypes()
			.then(types => {
				const convertedArr: SelectItem[] = [];

				types?.forEach(typeItem => {
					convertedArr.push({
						value: String(typeItem.id),
						label: typeItem.name,
					});
				});

				setTypeData([
					{ value: '0', label: 'Без разницы' },
					...convertedArr,
				]);
			})
			.catch(() => {
				setTypeData([
					{ value: '0', label: 'Без разницы' },
					...spareTypes,
				]);
			});
	}, []);

	useEffect(() => {
		if (window.location.search) {
			const currentFilterValue = qs.parse(
				window.location.search.replace('?', ''),
			);

			dispatch(setFilters({ ...currentFilterValue }));
			dispatch(
				getAllProducts({
					...currentFilterValue,
				}),
			);
		} else {
			dispatch(getAllProducts({}));
		}
	}, []); // определить есть ли параметры поиска

	useEffect(() => {
		const searchParams = qs.stringify({
			brandId,
			typeId,
			currentPage,
			minPrice,
			maxPrice,
			sizeId,
			sortBy,
		});

		console.log(searchParams);

		setSearchParams(searchParams);
	}, [brandId, typeId, currentPage, minPrice, maxPrice, sizeId, sortBy]); // установить параметры поиска

	const handelSetCategory = (categoryId: string) => {
		dispatch(setCategoryId(categoryId));
	};

	const handelSetBrand = (brandId: string) => {
		dispatch(setBrandId(brandId));
	};

	const handleSetSize = (sizeId: string) => {
		dispatch(setSizeId(sizeId));
	};

	const handleSetSortBy = (sortBy: any) => {
		dispatch(setSortBy(sortBy));
	};

	const applyFilter = () => {
		dispatch(setCurrentPage('1'));
		navigate(
			`?${searchParams.replace(
				`currentPage=${currentPage}`,
				`currentPage=1`,
			)}`,
		);
		dispatch(
			getAllProducts({
				brandId,
				typeId,
				currentPage: '1',
				minPrice,
				maxPrice,
				sizeId,
				sortBy,
			}),
		);
	};

	const resetFilter = () => {
		navigate(`/catalog`);
		dispatch(resetFilters());
		dispatch(getAllProducts({}));
	};

	return (
		<Stack
			style={{
				width: '100%',
			}}
			align="stretch"
			spacing="xs">
			<Title>Фильтр</Title>

			<MyRangeSlider />

			<Select
				data={typeData}
				label="Категория"
				placeholder="Выберите категорию"
				value={typeId}
				onChange={category => {
					category && handelSetCategory(category);
				}}
				allowDeselect
			/>

			<Select
				data={brandData}
				label="Бренд"
				placeholder="Выберете бренд"
				value={brandId}
				onChange={brand => {
					brand && handelSetBrand(brand);
				}}
				allowDeselect
			/>

			<Select
				data={sizeData}
				label="Размер"
				placeholder="Выберете размер"
				value={sizeId}
				onChange={sizeId => {
					sizeId && handleSetSize(sizeId);
				}}
				allowDeselect
			/>

			<Select
				label="Сортировка"
				placeholder="Выбери по какому значению сортировать товар"
				value={sortBy}
				onChange={value => {
					value && handleSetSortBy(value);
				}}
				data={sortData}
			/>

			<Button color="red" onClick={resetFilter} mt={10}>
				Очистить фильтр
			</Button>

			<Button onClick={applyFilter} mt={10}>
				Применить фильтр
			</Button>
		</Stack>
	);
};
