import {
	Stack,
	Title,
	Text,
	Button,
	Image,
	Group,
	Container,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import telescope from '../assets/images/telescope.png';
import { RouteNames } from '../types/enums/router';

export const NotFound = () => {
	return (
		<Container size={'lg'}>
			<Group
				position={'apart'}
				align={'center'}
				sx={theme => ({
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[5]
							: theme.colors.blue[0],
					marginTop: '10%',
					padding: '30px 60px',
				})}>
				<Image width={200} src={telescope} />
				<Stack style={{ width: '600px' }}>
					<Title>Такой страницы не существует!</Title>
					<Text>
						Упс, кажется, мы не можем найти страницу, которую вы
						ищете. Попробуйте вернуться на предыдущую страницу или
						на главную{' '}
					</Text>
					<Group>
						<Button
							component={Link}
							to={RouteNames.MAIN}
							mt={'xl'}
							variant={'light'}>
							На главную
						</Button>
					</Group>
				</Stack>
			</Group>
		</Container>
	);
};
