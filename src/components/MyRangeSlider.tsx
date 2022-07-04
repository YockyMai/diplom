import { RangeSlider, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { setPriceRange } from '../store/slices/filterSlice';

export const MyRangeSlider = () => {
	const dispatch = useAppDispatch();
	const { minPrice, maxPrice } = useAppSelector(state => state.filterState);
	const marks = [
		{ value: 0, label: '0₽' },
		{ value: 30000, label: '30 000₽' },
		{ value: 60000, label: '60 000₽' },
		{ value: 100000, label: '100 000₽' },
	];

	const changePriceRange = (range: any) => {
		dispatch(setPriceRange([range[0], range[1]]));
	};
	return (
		<div style={{ margin: '50px 0px 50px 0px' }}>
			<Text>Цена</Text>
			<RangeSlider
				marks={marks}
				label={val => `${val}₽`}
				min={0}
				step={1000}
				max={100000}
				defaultValue={[0, 100000]}
				value={[minPrice, maxPrice]}
				onChange={changePriceRange}
			/>
		</div>
	);
};
