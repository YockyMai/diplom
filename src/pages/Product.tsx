import {
	Button,
	Card,
	Center,
	Container,
	Grid,
	Group,
	Image,
	List,
	Mark,
	Modal,
	Select,
	SelectItem,
	Skeleton,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCartPlus, Star } from 'tabler-icons-react';
import { ImageServer } from '../components/ImageServer';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { addProductToCart } from '../store/slices/cartSlice';
import { getOneProduct } from '../store/slices/productSlice';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';

const availableRating = [1, 2, 3, 4, 5];

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
				<Grid
					style={{ height: '500px' }}
					grow
					align="center"
					justify="center">
					<Grid.Col span={6}>
						{item.img ? (
							<ImageServer src={item.img} height={500} />
						) : (
							'Пустое'
						)}
					</Grid.Col>
					<Grid.Col span={6}>
						<Title order={2}>Описание</Title>
						<Text my="xl">{item.info}</Text>
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
											{availableRating.map((_, index) => (
												<div key={index}>
													{index + 1 <=
													item.rating ? (
														<Star
															size={16}
															color="#f5cb25"
															fill="#f5cb25"
														/>
													) : (
														<Star
															size={16}
															color="#f5cb25"
														/>
													)}
												</div>
											))}
											Средний рейтинг:
											{item.rating
												? item.rating
												: 'не оцененно'}
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
			<Modal
				opened={cartErrorModal}
				onClose={() => setCartErrorModal(false)}
				size="30%">
				<Title align="center">😞</Title>
				<Title align="center" order={3}>
					Вы не авторизованны!
				</Title>
				<Text mt="xl" align="center">
					Чтобы добавлять товары в корзину, нужно иметь свой аккаунт!
				</Text>
				<Stack mt={50}>
					<Link to="/auth/login">
						<Button style={{ width: '100%' }} color="green">
							Войти в аккаунт
						</Button>
					</Link>

					<Link to="/auth/signup">
						<Button style={{ width: '100%' }}>
							Зарегистрироваться
						</Button>
					</Link>
				</Stack>
			</Modal>
		</Container>
	);
};
