import { Title, Text, Container, Alert } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { getProductInfo } from '../http/getApi';
import { IProductInfo } from '../types/objects/product';

export const ProductInfo = ({ productId }: { productId: number }) => {
	const [productInfo, setProductInfo] = useState<IProductInfo[]>([]);

	useEffect(() => {
		getProductInfo(productId)
			.then(info => {
				setProductInfo(info);
			})
			.catch(() => {
				showNotification({
					color: 'red',
					title: 'Ошибка!',
					message: 'Не удалось загрузить описание товара',
				});
			});
	}, []);

	return (
		<div>
			{productInfo.length <= 0 ? (
				<Text>На данный товар отсутствует описание</Text>
			) : (
				<Container size="xl">
					<Title align="center" order={2}>
						Описание
					</Title>
					{productInfo.map(infoEl => (
						<Alert
							mt="xl"
							icon={<AlertCircle size={16} />}
							title={infoEl.title}>
							<Text style={{ whiteSpace: 'pre-line' }}>
								{infoEl.description}
							</Text>
						</Alert>
					))}
				</Container>
			)}
		</div>
	);
};
