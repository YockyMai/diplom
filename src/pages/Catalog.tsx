import { Center, Container, SimpleGrid } from '@mantine/core';
import React, { FC } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useAppSelector } from '../hooks/react-redux';

interface Catalog {
	category?: string;
}

export const Catalog: FC<Catalog> = () => {
	const products = useAppSelector(state => state.productsState.items);

	return (
		<Container size="xl">
			<Center>
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
			</Center>
		</Container>
	);
};
