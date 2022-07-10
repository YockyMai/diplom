import { Button, Menu, Text, useMantineTheme } from '@mantine/core';
import qs from 'qs';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Category, Man, MoodBoy, Woman } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { setCategoryId, setCurrentPage } from '../store/slices/filterSlice';
import { getAllProducts } from '../store/slices/productSlice';

export const CatalogFilter = () => {
	const theme = useMantineTheme();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { brandId, maxPrice, minPrice, searchValue } = useAppSelector(
		state => state.filterState,
	);

	const changeCurrentCategory = (categoryNumber: string) => {
		dispatch(setCategoryId(categoryNumber));
		const searchFiled = qs.stringify({
			brandId,
			currentPage: '1',
			minPrice,
			maxPrice,
			searchValue,
			typeId: categoryNumber,
		});
		navigate(`/catalog/?${searchFiled}`);
		dispatch(setCurrentPage('1'));
		dispatch(
			getAllProducts({
				brandId,
				currentPage: '1',
				minPrice,
				maxPrice,
				searchValue,
				typeId: categoryNumber,
			}),
		);
	};

	return (
		<Menu
			control={
				<Button leftIcon={<Category />} color="green">
					<Text weight={200}>Каталог</Text>
				</Button>
			}>
			<Menu.Label>Весь каталог</Menu.Label>
			<Menu.Item
				onClick={() => changeCurrentCategory('0')}
				icon={<Man size={22} strokeWidth={1} />}>
				Все товары
			</Menu.Item>
			<Menu.Label>Выберите категорию!</Menu.Label>
			<Menu.Item
				onClick={() => changeCurrentCategory('1')}
				icon={<Man size={22} strokeWidth={1} />}>
				Мужская обувь
			</Menu.Item>
			<Menu.Item
				onClick={() => changeCurrentCategory('2')}
				icon={<Woman size={22} strokeWidth={1} />}>
				Женская обувь
			</Menu.Item>
			<Menu.Item
				onClick={() => changeCurrentCategory('3')}
				icon={<MoodBoy size={22} strokeWidth={1} />}>
				Десткая обувь
			</Menu.Item>
		</Menu>
	);
};
