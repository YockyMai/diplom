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
	Indicator,
} from '@mantine/core';
import { Search, ShoppingCart } from 'tabler-icons-react';
import { CatalogFilter } from '../components/CatalogFilter';
import { UserControlPanel } from '../components/UserControlPanel';
import logo from '../assets/images/logo.png';
import { RouteNames } from '../types/enums/router';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/react-redux';
import { CartButton } from '../components/UI/CartButton';
import { CatalogItems } from '../components/CatalogItems';

export default function Header() {
	const theme = useMantineTheme();

	const { username } = useAppSelector(state => state.userState.user);

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
				<Grid.Col span={6}>
					<Navbar.Section>
						<Group grow>
							<CatalogItems />
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
							<CartButton />
						</Group>
					</Navbar.Section>
				</Grid.Col>
				<Grid.Col span={2}>
					<Navbar.Section>
						<Group position="right">
							<Text>{username}</Text>
							<UserControlPanel />
						</Group>
					</Navbar.Section>
				</Grid.Col>
			</Grid>
		</Head>
	);
}
