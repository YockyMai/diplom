import { Alert, Button, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { PlaylistAdd } from 'tabler-icons-react';

export const ChangeSizeCount = () => {
	const [modalIsOpen, setModalOpen] = useState(false);
	return (
		<div>
			<Alert
				title="Изменить количество обуви к размеру"
				icon={<PlaylistAdd />}>
				<Text>Колчичетво обуви с данным размером</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Изменить
				</Button>
			</Alert>
			<Modal opened={modalIsOpen} onClose={() => setModalOpen(false)}>
				Добавить товар
			</Modal>
		</div>
	);
};
