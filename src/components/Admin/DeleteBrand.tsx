import {
	Alert,
	Button,
	Modal,
	Select,
	SelectItem,
	Stack,
	Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
	DatabaseOff,
	MoodHappy,
	MoodSad,
	PlaylistAdd,
	PlaylistOff,
	SquareMinus,
} from 'tabler-icons-react';
import { deleteBrand } from '../../http/adminApi';
import { getBrands } from '../../http/getApi';
import { validError } from '../../utils/validError';

export const DeleteBrand = () => {
	const [modalIsOpen, setModalOpen] = useState(false);

	const [brandId, setBrandId] = useState('');
	const [brandData, setBrandData] = useState<SelectItem[]>([]);

	const [status, setStatus] = useState<null | 'ok' | 'success'>(null);
	const [statusText, setStatusText] = useState('');

	useEffect(() => {
		getBrands().then(brands => {
			const convertedArr: SelectItem[] = [];

			brands?.forEach(brandItem => {
				convertedArr.push({
					value: String(brandItem.id),
					label: brandItem.name,
				});
			});

			setBrandData(convertedArr);
		});
	}, []);

	const removeBrand = () => {
		if (brandId) {
			deleteBrand(brandId).then(res => {
				setBrandId('');
				setStatus(res.status);
				setStatusText(res.message);

				let updatedBrands = brandData;
				updatedBrands.filter(brand => brand.value !== brandId);

				setBrandData(updatedBrands);
			});
		}
	};

	const closeModal = () => {
		setBrandId('');
		setStatusText('');
		setStatus(null);
		setModalOpen(false);
	};
	return (
		<div>
			<Alert title="Удалить бренд" icon={<SquareMinus />} color="red">
				<Text>
					<strong>Опастно! </strong> Отменить данное действие будет
					невозможно!
				</Text>
				<Button mt={10} color="red" onClick={() => setModalOpen(true)}>
					Удалить бренд
				</Button>
			</Alert>
			<Modal
				title="Добавить бренд"
				opened={modalIsOpen}
				onClose={closeModal}>
				<Stack>
					<Select
						value={brandId}
						data={brandData}
						onChange={value => value && setBrandId(value)}
						required
						searchable
					/>
					<Button
						onClick={removeBrand}
						leftIcon={<DatabaseOff />}
						color="red">
						Удалить бренд
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
