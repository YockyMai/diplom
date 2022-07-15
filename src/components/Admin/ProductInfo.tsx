import { Button, Stack, Table, Text, TextInput } from '@mantine/core';
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

interface ProductInfo {
	productInfo: { title: string; description: string }[];
	setProductInfo: Dispatch<
		SetStateAction<{ title: string; description: string }[]>
	>;
}

export const ProductInfo: FC<ProductInfo> = ({
	productInfo,
	setProductInfo,
}) => {
	const [infoTitle, setInfoTitle] = useState('');
	const [infoDescription, setInfoDescription] = useState('');
	console.log(productInfo);
	const addInfo = () => {
		setProductInfo([
			...productInfo,
			{ title: infoTitle, description: infoDescription },
		]);
		setInfoTitle('');
		setInfoDescription('');
	};

	const deleteInfoEl = (id: number) => {
		const updatedArr = [...productInfo].filter((_, index) => {
			if (index !== id) return true;
		});
		setProductInfo(updatedArr);
	};
	return (
		<Stack mt={30}>
			<Text>Информация о продукте</Text>
			<TextInput
				value={infoTitle}
				onChange={e => setInfoTitle(e.currentTarget.value)}
				label="Заголовок"
				placeholder="Заголовок описания"
				required
			/>
			<TextInput
				value={infoDescription}
				onChange={e => setInfoDescription(e.currentTarget.value)}
				label="Описание"
				placeholder="Текст описания"
				required
			/>
			<Button onClick={addInfo} color="green">
				Добавить описание
			</Button>

			{productInfo.length > 0 && (
				<Table>
					<thead>
						<tr>
							<th>Заголовок</th>
							<th>Описание</th>
							<th>Действие</th>
						</tr>
					</thead>
					<tbody>
						{productInfo.map((el, index) => (
							<tr key={el.description + index}>
								<td>{el.title}</td>
								<td>{el.description}</td>
								<td>
									<Button
										color="red"
										onClick={() => {
											deleteInfoEl(index);
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
