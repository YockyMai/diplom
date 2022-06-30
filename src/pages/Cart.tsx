import {
	Button,
	Container,
	Grid,
	Group,
	Highlight,
	Text,
	Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { CartItem } from '../components/CartItem';
import { useAppSelector } from '../hooks/react-redux';

export const Cart = () => {
	const items = useAppSelector(state => state.cartState.items);
	const totalPrice = useAppSelector(state => state.cartState.totalPrice);
	const totalCount = useAppSelector(state => state.cartState.totalCount);

	const [isLoading, setLoading] = useState(false);

	const orderPayment = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 3000);
	};

	return (
		<Container size="xl" style={{ marginTop: 100 }}>
			<Title order={1}>Корзина</Title>
			{items.length > 0 ? (
				<Grid grow justify="space-between">
					<Grid.Col span={8}>
						{items.map(item => (
							<CartItem product={item} />
						))}
					</Grid.Col>

					<Grid.Col span={4}>
						<Group
							pt={60}
							pb={20}
							grow
							position="center"
							align="center">
							<Text>{totalCount} товара :</Text>
							<Text align="right"> {totalPrice} ₽</Text>
						</Group>

						<hr />
						<Group
							pt={20}
							pb="xl"
							grow
							position="center"
							align="center">
							<Text>Итог :</Text>
							<Text align="right" size="xl" weight="600">
								{totalPrice} ₽
							</Text>
						</Group>

						<Button
							onClick={orderPayment}
							loading={isLoading}
							fullWidth
							color="orange">
							Оформить заказ
						</Button>
					</Grid.Col>
				</Grid>
			) : (
				<Text size="xl" align="center" mt="20%">
					Корзина пустая
				</Text>
			)}
		</Container>
	);
};
