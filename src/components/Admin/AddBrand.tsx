import { Alert, Button, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { PlaylistAdd } from 'tabler-icons-react';

export const AddBrand = () => {
	const [modalIsOpen, setModalOpen] = useState(false);
	return (
		<div>
			<Alert title="Добавить бренд" icon={<PlaylistAdd />}>
				<Text>Добавите бренд, например Nike, Adidas и тп.</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Добавить бренд
				</Button>
			</Alert>
			<Modal opened={modalIsOpen} onClose={() => setModalOpen(false)}>
				Добавить бренд
			</Modal>
		</div>
	);
};
