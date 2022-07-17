import {
	Button,
	Card,
	Center,
	Container,
	Grid,
	Group,
	Mark,
	Modal,
	Popover,
	Select,
	SelectItem,
	Skeleton,
	Stack,
	Tabs,
	Text,
	Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	InfoCircle,
	MessageCircle,
	ShoppingCartPlus,
	Star,
} from 'tabler-icons-react';
import { ProductInfo } from '../components/ProductInfo';
import { ProductStars } from '../components/ProductStars';
import { AuthModal } from '../components/UI/AuthModal';
import { ImageServer } from '../components/UI/ImageServer';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { Сomments } from '../modules/Сomments';
import { addProductToCart } from '../store/slices/cartSlice';
import { getOneProduct } from '../store/slices/productSlice';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';

export const Product = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const { item, isLoading, status } = useAppSelector(
		state => state.productsState.product,
	);
	const { isAuth } = useAppSelector(state => state.userState);

	const [errorModal, setOpenErrorModal] = useState(false); // Если не существует
	const [cartErrorModal, setCartErrorModal] = useState(false); // Если не авторизован

	const [selectedSize, setSelectedSize] = useState('');
	const [sizeError, setSizeError] = useState('');

	const [showRatingInfo, setShowRatingInfo] = useState(false);

	console.log(selectedSize);

	useEffect(() => {
		dispatch(getOneProduct(Number(id)));
	}, [id]);

	useEffect(() => {
		if (status === 'failed') {
			setOpenErrorModal(true);
		}
	}, [status]);

	const addProduct = () => {
		if (!isAuth) {
			setCartErrorModal(true);
		} else if (!selectedSize) {
			setSizeError('Вы должны выбрать размер');
		} else if (item) {
			dispatch(
				addProductToCart({
					productId: item?.id,
					sizeId: Number(selectedSize),
				}),
			);
			setSizeError('');
			showNotification({
				title: `Успешно!`,
				message: `Товар ${item?.name} добавлен в корзину`,
			});
		}
	};

	const dataSizes: SelectItem[] = [];
	item?.sizes.forEach(obj => {
		dataSizes.push({
			label: `Размер: ${obj.size.size}RU, Осталось ${obj.count} экземпляров`,
			value: `${obj.sizeId}`,
			disabled: obj.count <= 0 ? true : false,
		});
	});

	console.log(dataSizes);

	return (
		<Container style={{ marginTop: '100px' }} size="xl">
			{!isLoading && item ? (
				<Grid grow align="center" justify="center">
					<Grid.Col span={6}>
						{item.img ? (
							<ImageServer src={item.img} height={500} />
						) : (
							'Изображение недоступно'
						)}
					</Grid.Col>
					<Grid.Col span={6}>
						<Stack>
							<Card shadow="xl">
								<Container size="lg">
									<Card.Section py={10}>
										<Text size="lg" align="center">
											<>
												{item.type.name} {item.name}
											</>
										</Text>
									</Card.Section>
									<Card.Section pb={10}>
										<Group align="center">
											<ProductStars
												rating={item.rating}
											/>
											Средний рейтинг:
											{item.rating
												? item.rating
												: 'не оцененно'}
											<Popover
												opened={showRatingInfo}
												position="top"
												onClose={() =>
													setShowRatingInfo(false)
												}
												target={
													<InfoCircle
														onClick={() =>
															setShowRatingInfo(
																true,
															)
														}
														onMouseEnter={() =>
															setShowRatingInfo(
																true,
															)
														}
														onMouseLeave={() =>
															setShowRatingInfo(
																false,
															)
														}
													/>
												}>
												<Text>
													Поставить рейтинг можно,
													написав любой комментарий
													ниже, или на странице
													"Корзина" в разделе "Ваши
													заказы"
												</Text>
											</Popover>
										</Group>
									</Card.Section>
									<Card.Section py={15}>
										<Title order={2}>
											{currencyStringsFormatter.format(
												item.price,
											)}
										</Title>
									</Card.Section>

									<Card.Section>
										<Group>
											<Text>
												<>
													<Mark color="teal">
														Категории:
													</Mark>{' '}
													{item.brand.name},
													{item.type.name}
												</>
											</Text>
										</Group>
									</Card.Section>
									<Card.Section>
										<hr
											style={{
												width: '80%',
												margin: '15px auto',
											}}
										/>
										<Select
											required
											error={sizeError}
											value={selectedSize}
											onChange={value => {
												if (value)
													setSelectedSize(value);
											}}
											label="Доступные размеры"
											placeholder="Выберите размер"
											mb="xl"
											data={dataSizes}
										/>
										<Button
											style={{
												width: '100%',
												height: '50px',
											}}
											variant="gradient"
											gradient={{
												from: '#ed6ea0',
												to: '#ec8c69',
												deg: 35,
											}}
											onClick={addProduct}
											rightIcon={<ShoppingCartPlus />}>
											Добавить в коризну
										</Button>
									</Card.Section>
								</Container>
							</Card>
						</Stack>
					</Grid.Col>
					<Grid.Col span={12}>
						<Tabs mt="xl">
							<Tabs.Tab label="Отзывы" icon={<MessageCircle />}>
								<Сomments productId={id} />
							</Tabs.Tab>
							<Tabs.Tab
								label="Информация о товаре"
								icon={<InfoCircle />}>
								<ProductInfo productId={item.id} />
							</Tabs.Tab>
						</Tabs>
					</Grid.Col>
				</Grid>
			) : (
				<Grid
					style={{ height: '500px', marginTop: 50 }}
					grow
					align="center"
					justify="center">
					<Grid.Col span={6}>
						<Center>
							<Skeleton height={500} width={500} />
						</Center>
					</Grid.Col>
					<Grid.Col span={6}>
						<Stack>
							<Skeleton height={300} />
						</Stack>
					</Grid.Col>
				</Grid>
			)}
			<Modal opened={errorModal} onClose={() => setOpenErrorModal(false)}>
				<Title align="center" order={3}>
					Ошибка
				</Title>
				<Text mt="xl" align="center">
					Скорее всего такого товара не существует!
				</Text>
				<Text align="center">
					Или у нас произошла ошибка, попробуйте позже!
				</Text>
			</Modal>
			<AuthModal
				opened={cartErrorModal}
				onClose={() => setCartErrorModal(false)}
				text="Чтобы добавлять товары в корзину, нужно иметь свой аккаунт!"
			/>
		</Container>
	);
};
