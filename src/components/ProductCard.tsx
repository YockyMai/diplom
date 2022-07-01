import {
	Card,
	Group,
	useMantineTheme,
	Text,
	Badge,
	Image,
	Button,
	Center,
	SimpleGrid,
	Tooltip,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { IProduct } from '../types/objects/product';

interface ProductCard {
	product: IProduct;
}

export const ProductCard: FC<ProductCard> = ({ product }) => {
	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark'
			? theme.colors.dark[1]
			: theme.colors.gray[7];

	const id = '10';

	return (
		<div style={{ width: 300, marginTop: 30 }}>
			<Link to={id}>
				<Card radius="lg" shadow="sm" p="lg">
					<Card.Section
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}>
						<Center>
							<Image src={product.image} width={280} />
						</Center>
					</Card.Section>

					<Group position="apart" style={{ marginBottom: 20 }}>
						<Text weight={500}>{product.title}</Text>
					</Group>

					<Text
						size="sm"
						align="center"
						style={{ color: secondaryColor, lineHeight: 1.5 }}>
						{product.category === 'woman'
							? 'Женская обувь'
							: product.category === 'male'
							? 'Мужская обувь'
							: product.category === 'child' &&
							  'Обувь для ребенка'}{' '}
						{product.title}
					</Text>

					<SimpleGrid mt="lg" cols={4}>
						{product.discountPercent && (
							<Tooltip label="На данный товар сейчас действует скидка">
								<Badge
									style={{ fontWeight: 400 }}
									variant="gradient"
									gradient={{ from: 'orange', to: 'red' }}>
									Скидка
								</Badge>
							</Tooltip>
						)}

						<Tooltip label="Свежий товар!">
							<Badge
								style={{ fontWeight: 400 }}
								variant="gradient"
								gradient={{ from: 'green', to: 'lime' }}>
								Новинка
							</Badge>
						</Tooltip>
					</SimpleGrid>

					<Text align="right" mt="lg" size="md" weight={500}>
						{product.price} ₽
					</Text>
				</Card>
			</Link>
		</div>
	);
};
