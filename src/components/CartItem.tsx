import {
	Button,
	Card,
	Center,
	Group,
	Text,
	Title,
	useMantineTheme,
	Mark,
	ThemeIcon,
	Grid,
	ActionIcon,
} from '@mantine/core';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Minus, Plus, Trash } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { getCartRes } from '../store/slices/cartSlice';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';
import { ImageServer } from './ImageServer';

interface CartItem {
	cartItem: getCartRes;
}

export const CartItem: FC<CartItem> = ({ cartItem }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const findSimilarProducts = () => {
		navigate(
			`/catalog?brandId=${cartItem.product.brand.id}&typeId=${cartItem.product.type.id}`,
		);
	};

	return (
		<Card mt="xl">
			<Grid align="center" justify="space-between">
				<Grid.Col span={2}>
					{cartItem.product.img ? (
						<ImageServer height={100} src={cartItem.product.img} />
					) : (
						<Text>Нет изображения</Text>
					)}
				</Grid.Col>
				<Grid.Col span={4}>
					<div>
						<Text size="sm">
							<Mark>{cartItem.product.brand.name}</Mark>
							{' ' + cartItem.product.name}
						</Text>

						<Group>
							Размер :
							<Text weight={600}>
								{cartItem.size && cartItem.size.size}RU
							</Text>
						</Group>
					</div>
				</Grid.Col>
				<Grid.Col span={2}>
					<Title align="right" order={2}>
						{currencyStringsFormatter.format(
							cartItem.product.price,
						)}
					</Title>
				</Grid.Col>
				<Grid.Col span={3}>
					<Group position="center" align="center">
						<Button onClick={findSimilarProducts}>
							Найти похожие
						</Button>
						<ActionIcon color="red">
							<Trash />
						</ActionIcon>
					</Group>
				</Grid.Col>
			</Grid>
		</Card>
	);
};
