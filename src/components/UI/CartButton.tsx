import { Button, Indicator, Text } from '@mantine/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'tabler-icons-react';
import { useAppSelector } from '../../hooks/react-redux';
import { RouteNames } from '../../types/enums/router';

interface CartButton {}

export const CartButton: FC<CartButton> = () => {
	const totalCount = useAppSelector(state => state.cartState.items.length);

	return (
		<Link to={RouteNames.CART}>
			<Button
				style={{ width: '100%' }}
				variant="subtle"
				color="green"
				rightIcon={
					<Indicator label={totalCount} size={18}>
						<ShoppingCart size={28} strokeWidth={1} />
					</Indicator>
				}>
				<Text align="left" weight={200}>
					Корзина
				</Text>
			</Button>
		</Link>
	);
};
