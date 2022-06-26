import {
	Button,
	Container,
	Grid,
	Group,
	Highlight,
	Text,
	Title,
} from '@mantine/core';
import React from 'react';
import { CartItem } from '../components/CartItem';

export const Cart = () => {
	return (
		<Container size="xl" style={{ marginTop: 100 }}>
			<Title order={1}>Корзина</Title>
			<Grid grow justify="space-between">
				<Grid.Col span={8}>
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />
				</Grid.Col>
				<Grid.Col span={4}>
					<Group
						pt={60}
						pb={20}
						grow
						position="center"
						align="center">
						<Text>3 товара :</Text>
						<Text align="right"> 1050 ₽</Text>
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
							1050 ₽
						</Text>
					</Group>

					<Button fullWidth color="orange">
						Оформить заказ
					</Button>
				</Grid.Col>
			</Grid>
		</Container>
	);
};
