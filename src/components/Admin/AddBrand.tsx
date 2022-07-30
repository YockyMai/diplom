import { Alert, Button, Modal, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import {
	CirclePlus,
	DatabaseImport,
	MoodHappy,
	MoodSad,
} from 'tabler-icons-react';
import { createBrand } from '../../http/adminApi';
import { validError } from '../../utils/validError';

export const AddBrand = () => {
	const [modalIsOpen, setModalOpen] = useState(false);

	const [brandName, setBrandName] = useState('');

	const [statusText, setStatusText] = useState('');
	const [status, setStatus] = useState<null | 'ok' | 'success'>(null);

	const addBrand = () => {
		setBrandName('');
		if (brandName.length > 0) {
			createBrand(brandName)
				.then(res => {
					setStatusText(res.message);
					setStatus(res.status);
				})
				.catch(res => {
					setStatusText(res.message);
					setStatus(res.status);
				})
				.finally(() => {
					setBrandName('');
				});
		} else {
			validError('Заполните поле "Бренд"!');
		}
	};

	const closeModal = () => {
		setBrandName('');
		setStatusText('');
		setStatus(null);
		setModalOpen(false);
	};
	return (
		<div>
			<Alert title="Добавить бренд" icon={<CirclePlus />}>
				<Text>Добавите бренд, например Nike, Adidas и тп.</Text>
				<Button mt={10} onClick={() => setModalOpen(true)}>
					Добавить бренд
				</Button>
			</Alert>
			<Modal
				title="Добавить бренд"
				opened={modalIsOpen}
				onClose={closeModal}>
				<Stack>
					<TextInput
						label="Бренд"
						placeholder="Введите название бренда"
						value={brandName}
						onChange={e => {
							setBrandName(e.currentTarget.value);
						}}
						required
						maxLength={60}
					/>
					<Button onClick={addBrand} leftIcon={<DatabaseImport />}>
						Добавть бренд
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
