import React from 'react';
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
} from '@mantine/core';
import { Search, ShoppingCart } from 'tabler-icons-react';
import { CatalogFilter } from '../components/CatalogFilter';
import { UserControlPanel } from '../components/UserControlPanel';
import logo from '../assets/images/logo.png';
import { RouteNames } from '../types/router';
import { Link } from 'react-router-dom';

export default function Header() {
	const theme = useMantineTheme();

	return (
		<Head height="60px" fixed pt="xs">
			<Grid align="center" justify="space-around">
				<Grid.Col span={2}>
					<Navbar.Section>
						<Link to={RouteNames.MAIN}>
							<Button style={{ backgroundColor: 'transparent' }}>
								<Group direction="row">
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
							</Button>
						</Link>
					</Navbar.Section>
				</Grid.Col>
				<Grid.Col span={7}>
					<Navbar.Section>
						<Group grow>
							<CatalogFilter />
							<TextInput
								placeholder="Посик по каталогу"
								rightSection={
									<Search size={22} strokeWidth={1} />
								}
							/>
						</Group>
					</Navbar.Section>
				</Grid.Col>
				<Grid.Col span={1}>
					<Navbar.Section>
						<Group direction="column" align="end">
							<Link to={RouteNames.CART}>
								<Button
									variant="subtle"
									color="green"
									rightIcon={
										<ShoppingCart
											size={28}
											strokeWidth={1}
										/>
									}>
									<Text weight={200}>Корзина</Text>
								</Button>
							</Link>
						</Group>
					</Navbar.Section>
				</Grid.Col>
				<Grid.Col span={1}>
					<Navbar.Section>
						<Group position="right">
							<Avatar
								radius="xl"
								src={null}
								alt="Vitaly Rtishchev"
							/>
							<UserControlPanel />
						</Group>
					</Navbar.Section>
				</Grid.Col>
			</Grid>
		</Head>
	);
}
