import React from 'react';
import { Container, Tabs } from '@mantine/core';
import { ShoppingCart, History } from 'tabler-icons-react';
import { Basket } from './Basket';
import { Orders } from './Orders';

export const Cart = () => {
	return (
		<Container size="xl" style={{ marginTop: 100, minHeight: '550px' }}>
			<Tabs>
				<Tabs.Tab label="Корзина" icon={<ShoppingCart size={24} />}>
					<Basket />
				</Tabs.Tab>
				<Tabs.Tab label="Ваши заказы" icon={<History size={24} />}>
					<Orders />
				</Tabs.Tab>
			</Tabs>
		</Container>
	);
};
