import { Alert, Button, Modal, Stack, Text, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import {
	CirclePlus,
	DatabaseImport,
	MoodHappy,
	MoodSad,
	PlaylistAdd,
} from 'tabler-icons-react';
import { createBrand, createType } from '../../http/adminApi';
import { validError } from '../../utils/validError';

export const AddType = () => {
	const [modalIsOpen, setModalOpen] = useState(false);

	const [typeName, setTypeName] = useState('');

	const [statusText, setStatusText] = useState('');
	const [status, setStatus] = useState<null | 'ok' | 'success'>(null);

	const addType = () => {
		setTypeName('');
		if (typeName.length > 0) {
			createType(typeName)
				.then(res => {
					setStatusText(res.message);
					setStatus(res.status);
				})
				.catch(res => {
					setStatusText(res.message);
					setStatus(res.status);
				})
				.finally(() => {
					setTypeName('');
				});
		} else {
			validError('Заполните поле "Тип"!');
		}
	};

	const closeModal = () => {
		setTypeName('');
		setStatusText('');
		setStatus(null);
		setModalOpen(false);
	};
	return (
		<div>
			<Alert title="Добавить тип" icon={<CirclePlus />}>
				<Text>Добавите тип, например "верхняя одежда" и тп.</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Добавить тип
				</Button>
			</Alert>
			<Modal
				title="Добавить тип"
				opened={modalIsOpen}
				onClose={closeModal}>
				<Stack>
					<TextInput
						label="Тип"
						placeholder="Введите название типа"
						value={typeName}
						onChange={e => {
							setTypeName(e.currentTarget.value);
						}}
						required
						maxLength={60}
					/>
					<Button onClick={addType} leftIcon={<DatabaseImport />}>
						Добавть тип
					</Button>

					{status && (
						<Alert
							icon={status === 'ok' ? <MoodHappy /> : <MoodSad />}
							color={status === 'ok' ? 'green' : 'red'}>
							{statusText}
						</Alert>
					)}
				</Stack>
			</Modal>
		</div>
	);
};
