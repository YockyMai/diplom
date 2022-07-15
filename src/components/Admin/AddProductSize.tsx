import {
	Button,
	NumberInput,
	Select,
	Stack,
	Table,
	Text,
	TextInput,
} from '@mantine/core';
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { getSizes } from '../../http/getApi';

interface AddProductSize {
	sizes: { count: number; sizeId: number }[];
	setSizes: Dispatch<SetStateAction<{ count: number; sizeId: number }[]>>;
}

let instanceSizes: { value: string; label: string }[] = [];

export const AddProductSize: FC<AddProductSize> = ({ sizes, setSizes }) => {
	const [availableSizes, setAvailableSizes] = useState<
		{ value: string; label: string }[]
	>([]);

	const [count, setCount] = useState(0);
	const [sizeId, setSizeId] = useState(0);

	const [countError, setCountError] = useState('');
	const [sizeError, setSizeError] = useState('');

	useEffect(() => {
		getSizes().then(sizes => {
			const fetchingArr: { value: string; label: string }[] = [];

			sizes.forEach((el: any) => {
				fetchingArr.push({ value: el.id, label: el.size });
			});
			setAvailableSizes(fetchingArr);

			instanceSizes = fetchingArr;
		});
	}, []);

	const addSize = () => {
		if (count <= 0) setCountError('Количество должно быть больше нуля');
		else if (sizeId === 0) setSizeError('Выберите размер');
		else {
			const availibleSizesArr = [...availableSizes].filter(
				el => Number(el.value) !== sizeId,
			);
			setAvailableSizes(availibleSizesArr);

			setSizes([...sizes, { count, sizeId }]);
			setCount(0);
			setSizeId(0);
			setCountError('');
			setSizeError('');
		}
	};
	const removeSize = (sizeId: number) => {
		const addedEl = instanceSizes.find(el => Number(el.value) === sizeId);

		const availibleSizesArr = addedEl
			? [...availableSizes, addedEl]
			: [...availableSizes];

		setAvailableSizes(availibleSizesArr);

		const updatedArr = [...sizes].filter(size => {
			if (sizeId !== size.sizeId) return true;
		});

		setSizes(updatedArr);
	};

	return (
		<Stack mt={30}>
			<Text>Размеры</Text>
			<Select
				onChange={value =>
					Number.isInteger(Number(value)) && setSizeId(Number(value))
				}
				label="Размер"
				required
				placeholder="Выберите размер"
				data={availableSizes}
			/>
			<NumberInput
				error={countError.length > 0 && countError}
				required
				value={count}
				onChange={val => setCount(Number(val))}
				label="Количество"
				placeholder="Заголовок описания"
			/>

			<Button onClick={addSize} color="green">
				Добавить размер
			</Button>

			{sizes.length > 0 && (
				<Table>
					<thead>
						<tr>
							<th>Размер</th>
							<th>Количество</th>
							<th>Действие</th>
						</tr>
					</thead>
					<tbody>
						{sizes.map((el, index) => (
							<tr key={el.sizeId + index}>
								<td>{el.sizeId}</td>
								<td>{el.count}</td>
								<td>
									<Button
										color="red"
										onClick={() => {
											removeSize(el.sizeId);
										}}>
										Удалить
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Stack>
	);
};
