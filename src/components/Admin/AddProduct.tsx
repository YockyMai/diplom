import {
	Alert,
	Button,
	LoadingOverlay,
	Modal,
	NumberInput,
	Select,
	SelectItem,
	Stack,
	Table,
	Text,
	TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { CirclePlus, PlaylistAdd } from 'tabler-icons-react';
import { addSizesToProduct, createProduct } from '../../http/adminApi';
import { getBrands, getTypes } from '../../http/getApi';
import { AddProductSize } from './AddProductSize';
import { AddSize } from './AddSize';
import { MyDropZone } from './MyDropZone';
import { ProductInfo } from './ProductInfo';

export const AddProduct = () => {
	const [brandsData, setBrandsData] = useState<SelectItem[]>([]);
	const [typesData, setTypesData] = useState<SelectItem[]>([]);
	const [productName, setProductName] = useState('');
	const [selectedBrand, setBrand] = useState('');
	const [selectedType, setType] = useState('');
	const [filename, setFileName] = useState('');
	const [price, setPrice] = useState(0);
	const [productInfo, setProductInfo] = useState<
		{ title: string; description: string }[]
	>([]);
	const [sizes, setSizes] = useState<{ count: number; sizeId: number }[]>([]);

	const [isLoading, setLoading] = useState(false);

	const [modalIsOpen, setModalOpen] = useState(false);

	const [productId, setProductId] = useState('');
	const [sizeModalIsOpen, setSizeModalOpen] = useState(false);

	console.log(price);

	const resetStateValues = () => {
		setBrandsData([]);
		setTypesData([]);
		setProductName('');
		setBrand('');
		setType('');
		setFileName('');
		setPrice(0);
		setProductInfo([]);
		setSizes([]);
		setSizeModalOpen(false);
		setModalOpen(false);
		setPrice(0);
	};

	useEffect(() => {
		getBrands().then(brands => {
			const fethingBrands: SelectItem[] = [];
			brands?.forEach((el: any) => {
				fethingBrands.push({
					value: String(el.id),
					label: el.name,
				});
			});
			setBrandsData([...fethingBrands]);
		});
		getTypes().then(types => {
			const fethingTypes: SelectItem[] = [];
			types?.forEach((el: any) => {
				fethingTypes.push({ value: String(el.id), label: el.name });
			});
			setTypesData([...fethingTypes]);
		});
	}, [modalIsOpen]);

	const addProduct = () => {
		if (
			brandsData.length <= 0 ||
			typesData.length <= 0 ||
			selectedBrand.length <= 0 ||
			selectedType.length <= 0 ||
			filename.length <= 0 ||
			productInfo.length <= 0 ||
			price < 0 ||
			price > 100000
		) {
			showNotification({
				color: 'red',
				title: 'Ошибка!',
				message: 'Заполните все поля',
			});
		} else {
			setLoading(true);
			createProduct(
				productName,
				String(price),
				selectedBrand,
				selectedType,
				productInfo,
				filename,
			)
				.then(response => {
					setProductId(response.id);
					setLoading(false);
					setModalOpen(false);
					setSizeModalOpen(true);
				})
				.catch(err => {
					setLoading(false);
					setModalOpen(false);
				})
				.finally(() => {
					setLoading(false);
					setModalOpen(false);
				});
		}
	};

	const createSizes = () => {
		if (productId) {
			addSizesToProduct(productId, sizes).then(() => {
				showNotification({
					message: 'Товар успешно добавлен',
					title: 'Успешно!',
				});
				resetStateValues();
			});
		}
	};
	return (
		<div>
			<Alert title="Добавить товар" icon={<CirclePlus />}>
				<Text>
					Добавьте товар, который будет отображатся в каталоге у
					пользователей
				</Text>
				<Button onClick={() => setModalOpen(true)} mt={10}>
					Добавить товар
				</Button>
			</Alert>
			<Modal
				size="xl"
				opened={modalIsOpen}
				onClose={() => setModalOpen(false)}
				title="Добавьте товар">
				<Stack>
					<LoadingOverlay visible={isLoading} />
					<TextInput
						value={productName}
						onChange={e => setProductName(e.currentTarget.value)}
						label="Название товара"
						placeholder="Air Jordan"
						variant="filled"
						required
						maxLength={60}
					/>
					<Select
						value={selectedBrand}
						onChange={val => val && setBrand(val)}
						label="Бренд"
						placeholder="Выберите один"
						data={brandsData}
						required
						maxLength={60}
						searchable
					/>
					<Select
						value={selectedType}
						onChange={val => val && setType(val)}
						label="Тип"
						placeholder="Выберите один"
						data={typesData}
						required
						searchable
						maxLength={60}
					/>
					<NumberInput
						error={
							price > 100000 &&
							'Значение должно быть меньше 100.000 ₽'
						}
						value={price}
						onChange={val => val && setPrice(val)}
						label="Стоимость"
						required
						placeholder="Введите цену"
						defaultValue={0}
						icon={'₽'}
						hideControls
						maxLength={6}
					/>

					<ProductInfo
						productInfo={productInfo}
						setProductInfo={setProductInfo}
					/>

					<Text mt={30}>Изображение товара</Text>
					<MyDropZone fileSrc={filename} setFileSrc={setFileName} />

					<Button
						style={{ height: '80px' }}
						mt={30}
						onClick={addProduct}>
						Добавть товар!
					</Button>
				</Stack>
			</Modal>
			<Modal
				opened={sizeModalIsOpen}
				onClose={() => setSizeModalOpen(true)}
				withCloseButton={false}
				title="Добавьте размер товару"
				size="xl">
				<AddProductSize sizes={sizes} setSizes={setSizes} />
				<Stack>
					<Button
						disabled={sizes.length <= 0}
						mt={30}
						onClick={createSizes}>
						Готово!
					</Button>
				</Stack>
			</Modal>
		</div>
	);
};
