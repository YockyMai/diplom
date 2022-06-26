import {
	Container,
	Group,
	Title,
	Text,
	SimpleGrid,
	Center,
	AspectRatio,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'tabler-icons-react';
import { ProductCard } from '../components/ProductCard';

export const Main = () => {
	return (
		<Container size="xl">
			<Group position="apart" mt={100} align="center">
				<Title order={2}>Акции</Title>
				<Group>
					<Link to={'/'}>
						<Text variant="link">Все акции</Text>
					</Link>
					<ChevronRight />
				</Group>
			</Group>
			<Center>
				<SimpleGrid
					breakpoints={[
						{ maxWidth: 1480, cols: 3, spacing: 'md' },
						{ maxWidth: 1040, cols: 2, spacing: 'sm' },
						{ maxWidth: 800, cols: 1 },
					]}
					cols={4}>
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</SimpleGrid>
			</Center>

			<Group position="apart" mt={50} align="center">
				<Title order={2}>Новинки</Title>
				<Group>
					<Link to={'/'}>
						<Text variant="link">Все акции</Text>
					</Link>
					<ChevronRight />
				</Group>
			</Group>
			<Center>
				<SimpleGrid
					breakpoints={[
						{ maxWidth: 1480, cols: 3, spacing: 'md' },
						{ maxWidth: 1040, cols: 2, spacing: 'sm' },
						{ maxWidth: 800, cols: 1 },
					]}
					cols={4}>
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</SimpleGrid>
			</Center>

			<Title order={2} style={{ marginTop: 100 }} mb="xl">
				Мы на карте!
			</Title>
			<AspectRatio ratio={16 / 6}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.4060661102209!2d55.95101525644837!3d54.73621662996031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d93a6a4362416f%3A0x53e627c568e62f75!2z0KPRhNC40LzRgdC60LjQuSDQsNCy0LjQsNGG0LjQvtC90L3Ri9C5INGC0LXRhdC90LjQutGD0Lw!5e0!3m2!1sru!2sru!4v1656150905802!5m2!1sru!2sru"
					title="Google map"
					frameBorder="0"
					style={{ borderRadius: 10 }}
				/>
			</AspectRatio>
		</Container>
	);
};
