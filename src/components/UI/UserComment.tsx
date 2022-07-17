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
import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../types/objects/user';
import { TypographyStylesProvider } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import { getUserStars } from '../../http/getApi';
import { Star } from 'tabler-icons-react';

interface UserComment {
	createdAt: string;
	user: IUser;
	value: string;
	productId: number;
}

const availableRating = [1, 2, 3, 4, 5];

export const UserComment: FC<UserComment> = ({
	createdAt,
	user,
	value,
	productId,
}) => {
	const theme = useMantineTheme();
	const [userStars, setUserStars] = useState<null | number>(null);

	const color =
		theme.colorScheme == 'dark'
			? theme.colors.gray[0]
			: theme.colors.gray[9];

	const avatarSymbols =
		user.username && user.username.split(' ').length > 1
			? user.username.split(' ')[0].split('')[0] +
			  user.username.split(' ')[1].split('')[0]
			: user.username?.split('')[0];

	useEffect(() => {
		if (user.id)
			getUserStars(productId, user.id).then(rateObj => {
				setUserStars(rateObj.rate);
			});
	}, []);

	console.log(userStars);

	return (
		<Stack ml="xl" align="flex-start">
			<Group>
				<Avatar radius="xl">{avatarSymbols?.toUpperCase()}</Avatar>
				<Text color={color}>
					<Text weight={200}>
						{user.role === 'ADMIN'
							? 'Администратор'
							: 'Отзыв пользователя'}
						<strong>
							{user.role !== 'ADMIN' && ' ' + user.username}
						</strong>
					</Text>
					<Text color={color} align="right" size="sm">
						{userStars && (
							<>
								{availableRating.map((rating, index) => (
									<Star
										key={rating}
										size={12}
										fill={
											index < userStars
												? '#f5cb25'
												: 'transparent'
										}
										color="#f5cb25"
									/>
								))}
							</>
						)}
						{' оставлен в ' +
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
