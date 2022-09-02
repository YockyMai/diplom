import {
	ActionIcon,
	Container,
	Footer,
	Grid,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { BrandTelegram } from 'tabler-icons-react';
import { useWindowWidth } from '../hooks/useWindowWidth';

export const MyFooter = () => {
	const theme = useMantineTheme();

	const linkColor =
		theme.colorScheme === 'dark'
			? theme.colors.gray[5]
			: theme.colors.gray[9];

	return (
		<Footer mt={100} height={200}>
			<Container pt="md" size="xl">
				<Grid
					style={{
						textAlign: 'center',
					}}>
					<Grid.Col xs={12} md={4} sm={4}>
						<Title order={3}>Контакты</Title>
						<Stack mt="xl" spacing="xl">
							<Text component="a" href="tel:89276360125">
								8 927 636 01-25
							</Text>
							<Text
								href="mailto:g.valera15102003@gmail.com"
								component="a">
								g.valera15102003@gmail.com
							</Text>
							<ActionIcon
								component="a"
								style={{
									margin: '0 auto',
								}}
								href="https://t.me/YockyMai">
								<BrandTelegram />
							</ActionIcon>
						</Stack>
					</Grid.Col>
					<Grid.Col xs={12} md={4} sm={4}>
						<Title order={3}>Sneakers always</Title>
						<Stack mt="xl" spacing="xl">
							<Link to="/about">
								<Text style={{ color: linkColor }}>О нас</Text>
							</Link>
						</Stack>
					</Grid.Col>
					<Grid.Col xs={12} md={4} sm={4}>
						<Title order={3}>Время работы</Title>
						<Stack mt="xl" spacing="xl">
							<Text>Пн - чт : 9:00, 22:00 мск.</Text>
							<Text>Пт - Сб : 12:00, 21:00 мск.</Text>
						</Stack>
					</Grid.Col>
				</Grid>
			</Container>
		</Footer>
	);
};
