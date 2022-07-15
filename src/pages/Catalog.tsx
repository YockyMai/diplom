import {
	Center,
	Grid,
	MultiSelect,
	SimpleGrid,
	Title,
	Stack,
	Button,
	Pagination,
	Select,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import qs from 'qs';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BucketOff } from 'tabler-icons-react';
import { MyRangeSlider } from '../components/MyRangeSlider';
import { ProductCard } from '../components/ProductCard';
import { TopScroll } from '../components/UI/TopScroll';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import {
	setBrandId,
	setCategoryId,
	setFilters,
	setSearchValue,
	resetFilters,
	setCurrentPage,
	setSizeId,
} from '../store/slices/filterSlice';
import { getAllProducts } from '../store/slices/productSlice';

interface Catalog {
	category?: string;
}

const categoryData = [
	{ value: '0', label: 'Без разницы' },
	{ value: '1', label: 'Мужская обувь' },
	{ value: '2', label: 'Женская обувь' },
	{ value: '3', label: 'Детская обувь' },
];

const brandData = [
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

export const Catalog: FC<Catalog> = () => {
	const dispatch = useAppDispatch();
	const { items, count } = useAppSelector(state => state.productsState);
	const navigate = useNavigate();
	const [scroll, scrollTo] = useWindowScroll();

	const {
		brandId,
		typeId,
		currentPage,
		searchValue,
		minPrice,
		maxPrice,
		sizeId,
	} = useAppSelector(state => state.filterState);
	const [searchField, setSearchField] = useState<string>('');

	useEffect(() => {
		if (window.location.search) {
			setSearchValue(window.location.search);
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
			searchValue,
			minPrice,
			maxPrice,
			sizeId,
		});
		setSearchField(searchParams);
	}, [brandId, typeId, currentPage, searchValue, minPrice, maxPrice, sizeId]); // установить параметры поиска

	const handelSetCategory = (categoryId: string) => {
		dispatch(setCategoryId(categoryId));
	};

	const handelSetBrand = (brandId: string) => {
		dispatch(setBrandId(brandId));
	};

	const handleSetSize = (sizeId: string) => {
		dispatch(setSizeId(sizeId));
	};

	const applyFilter = () => {
		dispatch(setCurrentPage('1'));
		navigate(
			`?${searchField.replace(
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
				searchValue,
				sizeId,
			}),
		);
	};

	const resetFilter = () => {
		navigate(`/catalog`);
		dispatch(resetFilters());
		dispatch(getAllProducts({}));
	};

	const handleChangePage = (page: number) => {
		dispatch(setCurrentPage(Math.ceil(page)));
		console.log(page);
		navigate(
			`?${searchField.replace(
				`currentPage=${currentPage}`,
				`currentPage=${page}`,
			)}`,
		);
		dispatch(
			getAllProducts({
				brandId,
				typeId,
				sizeId,
				currentPage: String(page),
			}),
		);
		scrollTo({ y: 0 });
	};

	return (
		<Grid
			p={30}
			justify="center"
			grow
			gutter="md"
			style={{ paddingTop: 100 }}>
			<Grid.Col span={3}>
				<Center mt="30px">
					<Stack
						style={{
							width: '100%',
						}}
						align="stretch"
						spacing="xs">
						<Title>Фильтр</Title>

						<MyRangeSlider />

						<Select
							data={categoryData}
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

						<Button color="red" onClick={resetFilter} mt={10}>
							Очистить фильтр
						</Button>

						<Button onClick={applyFilter} mt={10}>
							Применить фильтр
						</Button>
					</Stack>
				</Center>
			</Grid.Col>

			<Grid.Col span={9}>
				<Center>
					{items.length <= 0 ? (
						<Stack mt="10%" align="center">
							<BucketOff color="#e04343" size={100} />
							<Title align="center" style={{ width: '65%' }}>
								Совпадений по вашему запросу не найдено 😞,
								попробуйте другой фильтр
							</Title>
						</Stack>
					) : (
						<Stack align="flex-end">
							<SimpleGrid
								breakpoints={[
									{ maxWidth: 1480, cols: 3, spacing: 'md' },
									{ maxWidth: 1040, cols: 2, spacing: 'sm' },
									{ maxWidth: 800, cols: 1 },
								]}
								cols={4}>
								{items.map(item => (
									<ProductCard key={item.id} product={item} />
								))}
							</SimpleGrid>
							<Pagination
								page={Number(currentPage)}
								onChange={handleChangePage}
								py="xl"
								total={Math.ceil(count / 8)}
							/>
						</Stack>
					)}
				</Center>
			</Grid.Col>
		</Grid>
	);
};
