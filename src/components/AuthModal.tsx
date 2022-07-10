import { Modal, Title, Text, Stack, Button } from '@mantine/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface AuthModal {
	opened: boolean;
	onClose: () => void;
	text: string;
}

export const AuthModal: FC<AuthModal> = ({ opened, onClose, text }) => {
	return (
		<Modal opened={opened} onClose={onClose} size="30%">
			<Title align="center">😞</Title>
			<Title align="center" order={3}>
				Вы не авторизованны!
			</Title>
			<Text mt="xl" align="center">
				{text}
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
	);
};
