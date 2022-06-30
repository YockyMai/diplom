import { Button, Indicator, Text } from '@mantine/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'tabler-icons-react';
import { useAppSelector } from '../hooks/react-redux';
import { RouteNames } from '../types/enums/router';

interface CartButton {}

export const CartButton: FC<CartButton> = () => {
	const totalCount = useAppSelector(state => state.cartState.totalCount);

	return (
		<Link to={RouteNames.CART}>
			<Indicator label={totalCount} size={22}>
				<Button
					variant="subtle"
					color="green"
					rightIcon={<ShoppingCart size={28} strokeWidth={1} />}>
					<Text weight={200}>Корзина</Text>
				</Button>
			</Indicator>
		</Link>
	);
};
