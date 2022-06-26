import {
	Button,
	Card,
	Container,
	Group,
	Highlight,
	Image,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import React, { FC } from 'react';
import { Minus, Plus } from 'tabler-icons-react';

interface CartItem {}

export const CartItem: FC<CartItem> = () => {
	const theme = useMantineTheme();
	const colors = {
		green: theme.colors.green[6],
		white: theme.colors.gray[0],
	};
	return (
		<Card mt="xl">
			<Group align="center">
				<Image
					style={{ margin: '0 auto' }}
					height={80}
					fit="contain"
					src="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5804.png"
				/>
				<div>
					<Highlight highlight={'Кроссовки'}>
						Кроссовки Reebok Classic Club C 85
					</Highlight>
					<Group>
						<Text weight={600}> 300 ₽ </Text> за шт.
					</Group>
				</div>
				<Group
					mx={20}
					style={{ backgroundColor: colors.green, borderRadius: 10 }}>
					<Button style={{ backgroundColor: colors.green }}>
						<Minus />
					</Button>
					<Text color={colors.white}>1</Text>
					<Button style={{ backgroundColor: colors.green }}>
						<Plus />
					</Button>
				</Group>

				<Title ml={60} align="right" order={2}>
					600 ₽
				</Title>
			</Group>
		</Card>
	);
};
