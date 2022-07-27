import {
	Alert,
	Button,
	Modal,
	NumberInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { CirclePlus, PlaylistAdd } from 'tabler-icons-react';
import { createSizeInstance } from '../../http/adminApi';
import { validError } from '../../utils/validError';

export const AddSizeInstance = () => {
	const [modalIsOpen, setModalOpen] = useState(false);

	const [size, setSize] = useState('');
	const convertedSize = Number(size.replace(/[^0-9.]/g, ''));
	const [sizeError, setSizeError] = useState('');

	const createInstance = () => {
		if (size) {
			createSizeInstance(convertedSize)
				.then(res => {
					if (res.status === 'error') {
						setSizeError(res.message);
					} else {
						showNotification({
							title: 'Успешно',
							message: res.message,
						});
						setSize('');
					}
				})
				.catch(() => {
					showNotification({
						color: 'red',
						title: 'Ошибка!',
						message: 'Ошибка сервера, попробуйте позже',
					});
				});
		}
	};

	const closeModal = () => {
		setModalOpen(false);
		setSize('');
		setSizeError('');
	};

	return (
		<div>
			<Alert title="Добавьте экземпляр размера!" icon={<CirclePlus />}>
				<Text>
					Экземпляр размера - это размеры, которые используются в
					фильтре товаров, он нужен, чтобы производить добавление
					размера к конкретному товару.{' '}
				</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Добавить
				</Button>
			</Alert>
			<Modal
				title="Создать экземпляр размера"
				opened={modalIsOpen}
				onClose={closeModal}>
				<Stack>
					<TextInput
						label="Размер"
						placeholder="Введите размер, например 36"
						value={size}
						onChange={e => {
							setSize(e.currentTarget.value);
							setSizeError('');
						}}
						error={sizeError}
					/>

					<Button
						onClick={createInstance}
						disabled={size.length == 0 && convertedSize <= 0}>
						Создать экземпляр
					</Button>
				</Stack>
			</Modal>
		</div>
	);
};
