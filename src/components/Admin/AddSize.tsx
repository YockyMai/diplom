import { Alert, Button, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { PlaylistAdd } from 'tabler-icons-react';

export const AddSize = () => {
	const [modalIsOpen, setModalOpen] = useState(false);
	return (
		<div>
			<Alert title="Добавить размер" icon={<PlaylistAdd />}>
				<Text>Размер отображается при добавлении товара в карзину</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Добавить размер
				</Button>
			</Alert>
			<Modal opened={modalIsOpen} onClose={() => setModalOpen(false)}>
				Добавить товар
			</Modal>
		</div>
	);
};
