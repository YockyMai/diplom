import {
	Center,
	Grid,
	SimpleGrid,
	Title,
	Stack,
	Pagination,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import qs from 'qs';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BucketOff } from 'tabler-icons-react';
import { CatalogFilter } from '../components/CatalogFilter';
import { MyRangeSlider } from '../components/MyRangeSlider';
import { ProductCard } from '../components/ProductCard';
import { TopScroll } from '../components/UI/TopScroll';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { setCurrentPage } from '../store/slices/filterSlice';
import { getAllProducts } from '../store/slices/productSlice';

interface Catalog {
	category?: string;
}

export const Catalog: FC<Catalog> = () => {
	const dispatch = useAppDispatch();
	const { items, count } = useAppSelector(state => state.productsState);

	const navigate = useNavigate();
	const [scroll, scrollTo] = useWindowScroll();

	const { brandId, typeId, currentPage, sizeId, minPrice, maxPrice, sortBy } =
		useAppSelector(state => state.filterState);
	const [searchParams, setSearchParams] = useState<string>('');

	const handleChangePage = (page: number) => {
		dispatch(setCurrentPage(Math.ceil(page)));
		navigate(
			`?${searchParams.replace(
				`currentPage=${currentPage}`,
				`currentPage=${page}`,
			)}`,
		);
		dispatch(
			getAllProducts({
				brandId,
				typeId,
				currentPage: String(page),
				minPrice,
				maxPrice,
				sizeId,
				sortBy,
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
					<CatalogFilter
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
				</Center>
			</Grid.Col>

			<Grid.Col span={9}>
				<Center>
					{items.length <= 0 ? (
						<Stack mt="23%" align="center">
							<Title
								align="center"
								order={2}
								style={{ width: '65%', fontWeight: 200 }}>
								Совпадений по вашему запросу не найдено 😞.
								Попробуйте другой фильтр!
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
