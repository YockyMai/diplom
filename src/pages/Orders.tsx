import { Text, Mark, Accordion, Stack, Table, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { getOrders } from '../store/slices/orderSlice';
import { format, parseISO } from 'date-fns';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';

export const Orders = () => {
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector(state => state.orderState);

	const [ratingModal, setRatingModal] = useState(false);

	useEffect(() => {
		dispatch(getOrders());
	}, []);

	return (
		<div>
			<Accordion>
				{orders?.map(order => (
					<Accordion.Item label={`Заказ номер ${order.id}`}>
						<Stack align="center">
							<Text>
								Статус заказа :
								<Mark
									color={
										order.status === 'active'
											? 'yellow'
											: 'green'
									}>
									{order.status === 'active'
										? 'В пути'
										: 'Завершен'}
								</Mark>
							</Text>
							<Text align="right">
								{'Был оформлен ' +
									format(
										parseISO(order.createdAt),
										"yyyy-MM-dd 'в' H:m",
									)}
							</Text>
						</Stack>

						<Text px="xl" py="xs">
							Заказ включает в себя :
						</Text>

						<Table highlightOnHover>
							<thead>
								<tr>
									<th>Товар</th>
									<th>Размер</th>
									<th>Цена</th>
									<th>Ваша оценка</th>
								</tr>
							</thead>
							<tbody>
								{order.order_products.map(item => (
									<tr key={item.id}>
										<td>{item.product.name}</td>
										<td>{item.size.size}</td>
										<td>
											{currencyStringsFormatter.format(
												item.product.price,
											)}
										</td>
										<td>
											<Button
												color="yellow"
												compact
												variant="outline"
												onClick={() =>
													setRatingModal(true)
												}>
												<Text size="xs" weight={200}>
													Оставить оценку
												</Text>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Text mt="xl" mb="sm">
							Сумма заказа :
							{' ' +
								currencyStringsFormatter.format(
									order.sum_price,
								)}
						</Text>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
};

// <Card mt="xl">
// 	<Grid align="center" justify="space-between">
// 		<Grid.Col span={2}>
// 			{item.product.img ? (
// 				<ImageServer
// 					height={100}
// 					src={item.product.img}
// 				/>
// 			) : (
// 				<Text>Нет изображения</Text>
// 			)}
// 		</Grid.Col>
// 		<Grid.Col span={2}>
// 			<div>
// 				<Text size="sm">
// 					<Mark>
// 						{item.product.brand.name}
// 					</Mark>
// 					{' ' + item.product.name}
// 				</Text>

// 				<Group>
// 					Размер :
// 					<Text weight={600}>
// 						{item.size.size}RU
// 					</Text>
// 				</Group>
// 			</div>
// 		</Grid.Col>
// 		<Grid.Col span={2}>
// 			<Title align="right" order={2}>
// {currencyStringsFormatter.format(
// 	item.product.price,
// )}
// 			</Title>
// 		</Grid.Col>
// 	</Grid>
// </Card>
