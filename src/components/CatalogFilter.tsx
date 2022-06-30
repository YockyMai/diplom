import { Button, Menu, Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Category, Man, MoodBoy, Woman } from 'tabler-icons-react';

export const CatalogFilter = () => {
	const theme = useMantineTheme();

	const color =
		theme.colorScheme === 'dark'
			? theme.colors.gray[0]
			: theme.colors.dark[9];

	return (
		<Menu
			control={
				<Button leftIcon={<Category />} color="green">
					<Text weight={200}>Каталог</Text>
				</Button>
			}>
			<Menu.Label>Выберите категорию!</Menu.Label>
			<Menu.Item icon={<Man size={22} strokeWidth={1} />}>
				<Link style={{ color: color }} to="/catalog">
					Мужская обувь
				</Link>
			</Menu.Item>
			<Menu.Item icon={<Woman size={22} strokeWidth={1} />}>
				<Link style={{ color: color }} to="/catalog">
					Женская обувь
				</Link>
			</Menu.Item>
			<Menu.Item icon={<MoodBoy size={22} strokeWidth={1} />}>
				<Link style={{ color: color }} to="/catalog">
					Десткая обувь
				</Link>
			</Menu.Item>
		</Menu>
	);
};
