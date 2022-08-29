import React, { useState } from 'react';
import { Button, Grid, Group, Modal, Switch, Text, Title } from '@mantine/core';
import { CartItem } from '../components/CartItem';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { placeOrder } from '../store/slices/cartSlice';

export const Basket = () => {
	const dispatch = useAppDispatch();

	const items = useAppSelector(state => state.cartState.items);
	const totalPrice = useAppSelector(state => state.cartState.totalPrice);

	const [isLoading, setLoading] = useState(false);
	const [orderModal, setOrderModal] = useState(false);

	const [showOrderInfo, switchShowOrderInfo] = useState(false);

	const orderPayment = () => {
		setLoading(true);
		dispatch(placeOrder()).then(() => {
			if (localStorage.getItem('show/orderInfo') !== 'no') {
				setOrderModal(true);
			}
			setLoading(false);
		});
	};

	const closeOrderInfoModal = () => {
		if (showOrderInfo === true) {
			localStorage.setItem('show/orderInfo', 'no');
		}
		setOrderModal(false);
	};

	return (
		<div>
			{items.length > 0 ? (
				<Grid grow justify="space-between">
					<Grid.Col lg={8}>
						{items.map(item => (
							<CartItem key={item.id} cartItem={item} />
						))}
					</Grid.Col>

					<Grid.Col lg={4}>
						<Group
							pt={60}
							pb={20}
							grow
							position="center"
							align="center">
							<Text>{items.length} товара :</Text>
							<Text align="right">
								{' '}
								{currencyStringsFormatter.format(totalPrice)}
							</Text>
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
								{currencyStringsFormatter.format(totalPrice)}
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

			<Modal
				size="lg"
				onClose={() => setOrderModal(false)}
				opened={orderModal}>
				<Title order={3} align="center" mt="xl">
					Заказ успешно оформлен
				</Title>
				<Text mt="xl">
					Перейдите в "Ваши заказы", чтобы просмотреть статус заказа
				</Text>
				<Text mt="xl">
					Там можно просмотреть ваши прошлые заказы и оставить отзыв о
					товаре!
				</Text>

				<Group position="apart" align="center" mt="xl">
					<Switch
						checked={showOrderInfo}
						onChange={e =>
							switchShowOrderInfo(e.currentTarget.checked)
						}
						label="Больше не показывать"
					/>

					<Button onClick={closeOrderInfoModal}>Понятно</Button>
				</Group>
			</Modal>
		</div>
	);
};
