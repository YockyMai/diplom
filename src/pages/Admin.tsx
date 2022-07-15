import { Accordion, Container, Stack, Title } from '@mantine/core';
import React from 'react';
import { AddBrand } from '../components/Admin/AddBrand';
import { AddProduct } from '../components/Admin/AddProduct';
import { AddSize } from '../components/Admin/AddSize';
import { ChangeSizeCount } from '../components/Admin/ChangeSizeCount';
import { DeleteProduct } from '../components/Admin/DeleteProduct';
import { useAppSelector } from '../hooks/react-redux';

export const Admin = () => {
	const { username } = useAppSelector(state => state.userState.user);

	return (
		<Container mt={100}>
			<Title align="center" order={3}>
				Добро пожаловать {username}
			</Title>

			<Accordion mt={150}>
				<Accordion.Item label="Действия с товарами">
					<Stack>
						<AddProduct />
						<AddBrand />
						<DeleteProduct />
					</Stack>
				</Accordion.Item>
				<Accordion.Item label="Действия с размерами">
					<Stack>
						<AddSize />
						<ChangeSizeCount />
					</Stack>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
};
