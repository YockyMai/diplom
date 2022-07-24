import { Alert, Button, Modal, SelectItem, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { PlaylistAdd } from 'tabler-icons-react';
import { getBrands } from '../../http/getApi';

export const DeleteProduct = () => {
	const [modalIsOpen, setModalOpen] = useState(false);

	return (
		<div>
			<Alert title="Удалить товар" icon={<PlaylistAdd />} color="red">
				<Text>
					<strong>Опастно!</strong> Отменить данное действие будет
					невозможно
				</Text>
				<Button color="red" mt={10} onClick={() => setModalOpen(true)}>
					Удалить товар
				</Button>
			</Alert>
			<Modal opened={modalIsOpen} onClose={() => setModalOpen(false)}>
				Удалить товар товар
			</Modal>
		</div>
	);
};
