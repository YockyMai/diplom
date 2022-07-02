import {
	Center,
	Grid,
	MultiSelect,
	SimpleGrid,
	Title,
	Stack,
	Button,
	Pagination,
} from '@mantine/core';
import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MyRangeSlider } from '../components/MyRangeSlider';
import { ProductCard } from '../components/ProductCard';
import { TopScroll } from '../components/TopScroll';
import { useAppSelector } from '../hooks/react-redux';

interface Catalog {
	category?: string;
}

export const Catalog: FC<Catalog> = () => {
	const products = useAppSelector(state => state.productsState.items);

	let [searchParams, setSearchParams] = useSearchParams();

	let params = searchParams.get('id');

	const categoryData = [
		{ value: '1', label: 'Мужская обувь' },
		{ value: '2', label: 'Женсткая обувь' },
		{ value: '3', label: 'Детская обувь' },
	];

	const brandData = [
		{ value: '1', label: 'Nike' },
		{ value: '2', label: 'Adidas' },
		{ value: '3', label: 'Jordan' },
	];

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

						<MultiSelect
							data={categoryData}
							label="Категория"
							placeholder="Выберите категорию"
						/>
						<MultiSelect
							data={brandData}
							label="Бренд"
							placeholder="Выберете бренд"
						/>
						<Button mt={10}>Применить фильтр</Button>
					</Stack>
				</Center>
			</Grid.Col>
			<Grid.Col span={9}>
				<Center>
					<Stack align="flex-end">
						<SimpleGrid
							breakpoints={[
								{ maxWidth: 1480, cols: 3, spacing: 'md' },
								{ maxWidth: 1040, cols: 2, spacing: 'sm' },
								{ maxWidth: 800, cols: 1 },
							]}
							cols={4}>
							{products.map(item => (
								<ProductCard product={item} />
							))}
						</SimpleGrid>
						<Pagination py="xl" total={10} />
					</Stack>
				</Center>
			</Grid.Col>
		</Grid>
	);
};
