import { Button, Menu, Text } from '@mantine/core';
import React from 'react';
import { Category, Man, MoodBoy, Woman } from 'tabler-icons-react';

export const CatalogFilter = () => {
	return (
		<Menu
			control={
				<Button leftIcon={<Category />} color="green">
					<Text weight={200}>Каталог</Text>
				</Button>
			}>
			<Menu.Label>Выберите категорию!</Menu.Label>
			<Menu.Item icon={<Man size={22} strokeWidth={1} />}>
				Мужская обувь
			</Menu.Item>
			<Menu.Item icon={<Woman size={22} strokeWidth={1} />}>
				Женская обувь
			</Menu.Item>
			<Menu.Item icon={<MoodBoy size={22} strokeWidth={1} />}>
				Десткая обувь
			</Menu.Item>
		</Menu>
	);
};
