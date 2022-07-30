import { Alert, Button, Modal, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { CirclePlus, PlaylistAdd } from 'tabler-icons-react';
import { addSizesToProduct } from '../../http/adminApi';
import { CatalogSearch } from '../../modules/CatalogSearch';
import { AddProductSize } from './AddProductSize';

export const AddSize = () => {
	const [productId, setProductId] = useState<string | null>(null);

	const selectProductId = (id: string) => {
		setProductId(id);
	};

	const [sizes, setSizes] = useState<{ count: number; sizeId: number }[]>([]);
	const [sizeModalIsOpen, setSizeModalOpen] = useState(false);
	const createSizes = () => {
		if (productId) {
			addSizesToProduct(productId, sizes).then(() => {
				showNotification({
					message: 'Количество изменено',
					title: 'Успешно!',
				});
				clearModalData();
			});
		}
	};

	const clearModalData = () => {
		setProductId(null);
		setSizes([]);
	};

	const closeModal = () => {
		setSizeModalOpen(false);
		clearModalData();
	};
	return (
		<div>
			<Alert title="Количество товара" icon={<CirclePlus />}>
				<Text>Измените количество товара с конкретным размером</Text>
				<Button mt={10} onClick={() => setSizeModalOpen(true)}>
					Изменить
				</Button>
			</Alert>
			<Modal
				opened={sizeModalIsOpen}
				onClose={closeModal}
				title="Добавьте размер товару"
				size="xl">
				<CatalogSearch
					label="Найдите товар, у которого хотите изменить количество"
					selectSearchItem={selectProductId}
				/>
				{productId && (
					<>
						<AddProductSize sizes={sizes} setSizes={setSizes} />
						<Stack>
							<Button
								disabled={sizes.length <= 0}
								mt={30}
								onClick={createSizes}>
								Изменить!
							</Button>
						</Stack>
					</>
				)}
			</Modal>
		</div>
	);
};
