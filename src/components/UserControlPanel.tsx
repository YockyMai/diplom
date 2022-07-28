import { ActionIcon, ColorScheme, Text, Menu, Title } from '@mantine/core';
import React from 'react';
import {
	DeviceDesktopAnalytics,
	DoorExit,
	Login,
	NewSection,
	Sun,
} from 'tabler-icons-react';
import { RootState } from '../store';
import { Colors } from '../types/enums/colors';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../types/enums/router';
import { signOut } from '../store/slices/userSlice';
import { showNotification } from '@mantine/notifications';
import { switchTheme } from '../store/slices/themeSlice';
import { useWindowWidth } from '../hooks/useWindowWidth';

export const UserControlPanel = () => {
	const dispatch = useAppDispatch();
	const colorScheme = useAppSelector(state => state.themeState.theme);
	const { isAuth } = useAppSelector(state => state.userState);
	const username = useAppSelector(state => state.userState.user.username);
	const role = useAppSelector(state => state.userState.user.role);

	const navigate = useNavigate();

	const toggleColorScheme = () => dispatch(switchTheme());

	const exitAccount = () => {
		dispatch(signOut());
		showNotification({
			title: 'Вы вышли из аккаунта!',
			message: 'Чтобы войти в аккаунт, зайдите на страницу входа',
		});
	};

	return (
		<Menu>
			<Menu.Label>
				{username}
				<br />
				Действия с акканутом
			</Menu.Label>

			{isAuth ? (
				<Menu.Item
					color="red"
					onClick={exitAccount}
					icon={
						<DoorExit
							size={16}
							strokeWidth={2}
							color={Colors.red}
						/>
					}>
					Выход
				</Menu.Item>
			) : (
				<>
					<Link to={'/auth/signup'}>
						<Menu.Item icon={<NewSection size={18} />}>
							Региситрация
						</Menu.Item>
					</Link>
					<Link to={'/auth/login'}>
						<Menu.Item icon={<Login size={18} />}>
							Войти в аккаунт
						</Menu.Item>
					</Link>
				</>
			)}

			<Menu.Label>Тема</Menu.Label>
			<Menu.Item onClick={toggleColorScheme} icon={<Sun size={18} />}>
				{colorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
			</Menu.Item>
			{role === 'ADMIN' && (
				<>
					<Menu.Label>Админ</Menu.Label>
					<Link to={'/admin'}>
						<Menu.Item icon={<DeviceDesktopAnalytics size={18} />}>
							Панель администратора
						</Menu.Item>
					</Link>
				</>
			)}
		</Menu>
	);
};
