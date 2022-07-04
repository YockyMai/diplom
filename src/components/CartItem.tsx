import {
	Button,
	Card,
	Container,
	Group,
	Highlight,
	Image,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import React, { FC } from 'react';

import { Minus, Plus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { addOneItem, awayOneItem } from '../store/slices/cartSlice';
import { ICartItem } from '../types/objects/cartItem';

interface CartItem {
	product: ICartItem;
}

export const CartItem: FC<CartItem> = ({ product }) => {
	const dispatch = useAppDispatch();

	const theme = useMantineTheme();
	const colors = {
		green: theme.colors.green[6],
		white: theme.colors.gray[0],
	};

	const incrementItem = () => {
		dispatch(addOneItem(product));
	};

	const decrementItem = () => {
		dispatch(awayOneItem(product));
	};

	return (
		<Card mt="xl">
			<Group grow align="center">
				<Image
					style={{ margin: '0 auto' }}
					height={80}
					fit="contain"
					radius={10}
					src={product.img ? product.img : ''}
				/>
				<div>
					<Text size="sm">
						{product.brand.name} {product.name}
					</Text>

					<Group>
						<Text weight={600}> {product.price} ₽ </Text> за шт.
					</Group>
				</div>

				<Group
					grow
					style={{
						backgroundColor: colors.green,
						borderRadius: 10,
					}}>
					<Button
						onClick={decrementItem}
						style={{ backgroundColor: colors.green }}>
						<Minus />
					</Button>
					<Text align="center" color={colors.white}>
						{product.count}
					</Text>
					<Button
						onClick={incrementItem}
						style={{ backgroundColor: colors.green }}>
						<Plus />
					</Button>
				</Group>

				<Title align="right" order={2}>
					{product.totalPrice} ₽
				</Title>
			</Group>
		</Card>
	);
};
