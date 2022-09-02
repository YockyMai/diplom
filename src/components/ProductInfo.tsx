import { Title, Text, Container, Alert, Skeleton } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { getProductInfo } from '../http/getApi';
import { IProductInfo } from '../types/objects/product';

export const ProductInfo = ({ productId }: { productId: number }) => {
	const [productInfo, setProductInfo] = useState<IProductInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
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
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div>
			<Container size="xl">
				<Title align="center" order={2}>
					Описание
				</Title>
				{isLoading ? (
					<Skeleton mt={30} height={180} />
				) : productInfo.length <= 0 ? (
					<Text>На данный товар отсутствует описание</Text>
				) : (
					<>
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
					</>
				)}
			</Container>
		</div>
	);
};
