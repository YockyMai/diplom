import { ActionIcon, ColorScheme, Menu } from '@mantine/core';
import React from 'react';
import { DoorExit, Login, Sun } from 'tabler-icons-react';
import { switchTheme } from '../store/slices/themeSlice';
import { RootState } from '../store';
import { Colors } from '../types/enums/colors';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../types/enums/router';

export const UserControlPanel = () => {
	const dispatch = useAppDispatch();
	const colorScheme = useAppSelector(
		(state: RootState) => state.themeState.theme,
	);

	const navigate = useNavigate();

	const toggleColorScheme = () => dispatch(switchTheme());

	const navToAuth = () => navigate(RouteNames.SIGN_UP);

	return (
		<Menu>
			<Menu.Label>Действия с акканутом</Menu.Label>
			<Menu.Item
				color="red"
				icon={
					<DoorExit size={16} strokeWidth={2} color={Colors.red} />
				}>
				Выход
			</Menu.Item>
			<Link to={'/auth/signup'}>
				<Menu.Item onClick={navToAuth} icon={<Login size={18} />}>
					Войти в аккаунт
				</Menu.Item>
			</Link>
			<Menu.Label>Тема</Menu.Label>
			<Menu.Item onClick={toggleColorScheme} icon={<Sun size={18} />}>
				{colorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
			</Menu.Item>
		</Menu>
	);
};
