import {
	Alert,
	Button,
	Center,
	Modal,
	SelectItem,
	Stack,
	Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { InfoCircle, PlaylistAdd, SquareMinus } from 'tabler-icons-react';
import { deleteProduct } from '../../http/adminApi';
import { getBrands, getOneProduct } from '../../http/getApi';
import { CatalogSearch } from '../../modules/CatalogSearch';
import { IProduct } from '../../types/objects/product';
import { ProductCard } from '../ProductCard';

export const DeleteProduct = () => {
	const [modalIsOpen, setModalOpen] = useState(false);
	const [productId, setProductId] = useState<string | null>(null);

	const [product, setProduct] = useState<IProduct | null>(null);

	useEffect(() => {
		if (productId)
			getOneProduct(productId).then(product => {
				setProduct(product);
			});
	}, [productId]);

	const selectSearchItem = (id: string) => {
		setProductId(id);
	};

	const onDeleteProduct = () => {
		if (productId)
			deleteProduct(productId).then(() => {
				setModalOpen(false);
				setProduct(null);
				setProductId(null);
				showNotification({
					title: 'Успешно',
					message: `Товар под ключевым номером "${productId}" удален!`,
				});
			});
	};
	return (
		<div>
			<Alert title="Удалить товар" icon={<SquareMinus />} color="red">
				<Text>
					<strong>Опастно!</strong> Отменить данное действие будет
					невозможно
				</Text>
				<Button color="red" mt={10} onClick={() => setModalOpen(true)}>
					Удалить товар
				</Button>
			</Alert>
			<Modal
				size="xl"
				title={'Удалить товар'}
				opened={modalIsOpen}
				onClose={() => setModalOpen(false)}>
				<CatalogSearch
					label="Выберите товар для удаления"
					selectSearchItem={selectSearchItem}
				/>

				{product && (
					<>
						<Alert
							mt="xl"
							title="Отменить данное действие будет невозможно!"
							icon={<InfoCircle />}
							color="red">
							<Text>
								Вы уверены что хотите удалить этот товар?
							</Text>
						</Alert>
						<Stack>
							<Center>
								<div
									style={{
										pointerEvents: 'none',
									}}>
									<ProductCard product={product} />
								</div>
							</Center>

							<Button
								mt={10}
								color="red"
								onClick={onDeleteProduct}>
								Удалить
							</Button>
						</Stack>
					</>
				)}
			</Modal>
		</div>
	);
};
