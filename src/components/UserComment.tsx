import {
	Avatar,
	Container,
	Group,
	List,
	Modal,
	Spoiler,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import React, { FC, useState } from 'react';
import { Icomment } from '../store/slices/commentsSlice';
import { IUser } from '../types/objects/user';
import { TypographyStylesProvider } from '@mantine/core';
import { format, parseISO } from 'date-fns';

interface UserComment {
	createdAt: string;
	user: IUser;
	value: string;
}

export const UserComment: FC<UserComment> = ({ createdAt, user, value }) => {
	const theme = useMantineTheme();

	const color =
		theme.colorScheme == 'dark'
			? theme.colors.gray[0]
			: theme.colors.gray[9];

	const avatarSymbols =
		user.username && user.username.split(' ').length > 1
			? user.username.split(' ')[0].split('')[0] +
			  user.username.split(' ')[1].split('')[0]
			: user.username?.split('')[0];

	return (
		<Stack ml="xl" align="flex-start">
			<Group>
				<Avatar radius="xl">{avatarSymbols?.toUpperCase()}</Avatar>
				<Text color={color}>
					<Title order={4}>
						Отзыв пользователя <strong>{user.username}</strong>
					</Title>

					<Text color={color} align="right" size="sm">
						{'оставлен в ' +
							format(parseISO(createdAt), 'dd.MM.yyyy')}
					</Text>
				</Text>
			</Group>
			<Spoiler
				maxHeight={120}
				showLabel="Читать дальше"
				hideLabel="Скрыть"
				style={{
					maxWidth: '70%',
					marginLeft: '50px',
				}}>
				<TypographyStylesProvider>
					<div dangerouslySetInnerHTML={{ __html: value }} />
				</TypographyStylesProvider>
			</Spoiler>

			<span
				style={{ borderBottom: `1px solid ${color}`, width: '80%' }}
			/>
		</Stack>
	);
};
