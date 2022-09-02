import React from 'react';
import {
	Container,
	Title,
	Text,
	Stack,
	Card,
	Group,
	Image,
} from '@mantine/core';
import { CatalogLinkCards } from '../components/CatalogLinkCards';

export const Main = () => {
	return (
		<Container style={{ textAlign: 'center' }} mt={100} size={'xl'}>
			<Stack>
				<Title order={2} align={'center'}>
					Добро пожаловать, мы - Sneakers always, онлайн магазин
					который готов предоставить тебе качественный товар!
				</Title>

				<Text size="lg" mb={50} color={'dimmed'}>
					Выбирай свою категорию и бегом за покупками!
				</Text>
				<CatalogLinkCards />
			</Stack>
		</Container>
	);
};
