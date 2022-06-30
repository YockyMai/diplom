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
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { IProduct } from '../types/objects/product';

interface ProductCard {
	product: IProduct;
}

export const ProductCard: FC<ProductCard> = ({ product }) => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector(state => state.cartState.items);

	const isFirst = !cartItems.find(el => {
		if (el.id === product.id) return true;
	});

	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark'
			? theme.colors.dark[1]
			: theme.colors.gray[7];

	const addItemToCart = () => {
		dispatch(
			addToCart({ ...product, count: 1, totalPrice: product.price }),
		);
	};

	const showProductMsg = () => {
		showNotification({
			title: `${product.title}`,
			message: 'Товар уже добавлен в корзину!',
			color: 'orange',
		});
	};

	return (
		<div style={{ width: 300, marginTop: 30 }}>
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

				<Button
					variant="outline"
					color={isFirst ? 'green' : 'orange'}
					fullWidth
					style={{ marginTop: 14 }}
					onClick={isFirst ? addItemToCart : showProductMsg}>
					{isFirst ? 'В корзину' : 'Данный товар уже в корзине'}
				</Button>
				<Text align="right" mt="lg" size="sm" weight={500}>
					{product.price} ₽
				</Text>
			</Card>
		</div>
	);
};
