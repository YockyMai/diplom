import { RangeSlider, Text } from '@mantine/core';
import React from 'react';

export const MyRangeSlider = () => {
	const marks = [
		{ value: 0, label: '0₽' },
		{ value: 30000, label: '30 000₽' },
		{ value: 60000, label: '60 000₽' },
		{ value: 100000, label: '100 000₽' },
	];
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
			/>
		</div>
	);
};
