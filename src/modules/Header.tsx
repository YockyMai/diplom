import React, { useEffect, useState } from 'react';
import {
	Header as Head,
	Text,
	Navbar,
	TextInput,
	Avatar,
	Grid,
	Group,
	Button,
	Image,
	useMantineTheme,
	Indicator,
	Burger,
	Drawer,
	Stack,
	Modal,
	Skeleton,
} from '@mantine/core';
import { Search, ShoppingCart } from 'tabler-icons-react';
import { CatalogFilter } from '../components/CatalogFilter';
import { UserControlPanel } from '../components/UserControlPanel';
import logo from '../assets/images/logo.png';
import { RouteNames } from '../types/enums/router';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/react-redux';
import { CartButton } from '../components/UI/CartButton';
import { CatalogItems } from '../components/CatalogItems';
import { CatalogSearch } from './CatalogSearch';
import { useWindowWidth } from '../hooks/useWindowWidth';

export default function Header() {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const windowWidth = useWindowWidth();

	const [searchModal, setSearchModal] = useState(false);

	const { username } = useAppSelector(state => state.userState.user);
	const [burgerIsOpen, setBurgerOpen] = useState<boolean>(false);

	const selectSearchItem = (id: string) => {
		navigate(`/catalog/product/${id}`);
		setSearchModal(false);
	};

	useEffect(() => {
		setBurgerOpen(false);
	}, [location]);

	return (
		<Head height="60px" fixed pt="xs">
			{windowWidth >= 1207 ? (
				<Grid align="center" justify="space-around">
					<Grid.Col span={2}>
						<Navbar.Section>
							<Link to={RouteNames.MAIN}>
								<Group>
									<Image height={36} width={50} src={logo} />
									<Text
										weight={200}
										color={
											theme.colorScheme === 'dark'
												? theme.colors.gray[0]
												: theme.colors.gray[9]
										}>
										Sneakers always
									</Text>
								</Group>
							</Link>
						</Navbar.Section>
					</Grid.Col>
					<Grid.Col span={1}>
						<Navbar.Section>
							<Group>
								<CatalogItems />
							</Group>
						</Navbar.Section>
					</Grid.Col>
					<Grid.Col span={3}>
						<Navbar.Section>
							<CatalogSearch
								selectSearchItem={selectSearchItem}
							/>
						</Navbar.Section>
					</Grid.Col>
					<Grid.Col span={2}>
						<Navbar.Section>
							<Group direction="column" align="end">
								<CartButton />
							</Group>
						</Navbar.Section>
					</Grid.Col>
					<Grid.Col span={2}>
						<Navbar.Section>
							<Group position="right">
								{username ? (
									<>
										<Text>{username}</Text>
										<UserControlPanel />
									</>
								) : (
									<Skeleton width={150} height={30} />
								)}
							</Group>
						</Navbar.Section>
					</Grid.Col>
				</Grid>
			) : (
				<>
					<Grid align="center" justify="space-between" px="md">
						<Grid.Col span={2}>
							<Navbar.Section>
								<Burger
									opened={burgerIsOpen}
									onClick={() => setBurgerOpen(!burgerIsOpen)}
								/>
							</Navbar.Section>
						</Grid.Col>
						<Grid.Col span={10}>
							<Navbar.Section>
								<Group position="right">
									{username ? (
										<>
											<Text>{username}</Text>
											<UserControlPanel />
										</>
									) : (
										<Skeleton width={150} height={30} />
									)}
								</Group>
							</Navbar.Section>
						</Grid.Col>
					</Grid>
					<Drawer
						title={
							<Link to={RouteNames.MAIN}>
								<Group>
									<Image height={36} width={50} src={logo} />
									<Text
										weight={200}
										color={
											theme.colorScheme === 'dark'
												? theme.colors.gray[0]
												: theme.colors.gray[9]
										}>
										Sneakers always
									</Text>
								</Group>
							</Link>
						}
						onClose={() => setBurgerOpen(false)}
						opened={burgerIsOpen}
						padding="sm">
						<Stack pt="xl" spacing="xl">
							<Button
								onClick={() => {
									setSearchModal(true);
								}}
								leftIcon={<Search />}>
								Поиск по каталогу
							</Button>
							<CatalogItems />
							<CartButton />
						</Stack>
					</Drawer>
					<Modal
						title="Поиск"
						opened={searchModal}
						onClose={() => setSearchModal(false)}>
						<CatalogSearch selectSearchItem={selectSearchItem} />
					</Modal>
				</>
			)}
		</Head>
	);
}
