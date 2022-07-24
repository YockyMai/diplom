import { createRef, forwardRef, useEffect, useState } from 'react';
import {
	Group,
	Avatar,
	Text,
	Select,
	Stack,
	Loader,
	Center,
} from '@mantine/core';
import { MoodSad, Search, Star } from 'tabler-icons-react';
import currencyStringsFormatter from '../utils/currencyStringsFormatter';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { closeSearch, getSearchItems } from '../store/slices/searchDropDown';
import { $SERVER_URL } from '../http';
import { useNavigate } from 'react-router-dom';

export interface SearchItemProps extends React.ComponentPropsWithoutRef<'div'> {
	value: string;
	img: string;
	label: string;
	rating: number;
	type: string;
	brand: string;
	price: number;
}

const SelectItem = forwardRef<HTMLDivElement, SearchItemProps>(
	(
		{
			img,
			label,
			rating,
			type,
			brand,
			price,
			value,
			...others
		}: SearchItemProps,
		ref,
	) => (
		<div key={value} ref={ref} {...others}>
			<Group position="apart" noWrap>
				<Group noWrap>
					<Avatar src={`${$SERVER_URL}/${img}`} />
					<Stack>
						<Text size="sm" color="pink">
							{label}
						</Text>

						<Group mt={-10}>
							<Text size="xs" color="dimmed">
								{type} / {brand}
							</Text>

							<Text size="sm" color="yellow">
								{rating} <Star fill="#F5CB25" size={12} />
							</Text>
						</Group>
					</Stack>
				</Group>
				<Text align="right">
					{currencyStringsFormatter.format(price)}
				</Text>
			</Group>
		</div>
	),
);

export function CatalogSearch() {
	const dispatch = useAppDispatch();
	const { sector, isLoading, items } = useAppSelector(
		state => state.searchDropDownState,
	);

	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');

	const searchInput = createRef<HTMLInputElement>();
	const [searchTimeout, setSearchTimeout] = useState<any>(false);

	useEffect(() => {
		if (searchValue.length === 0) {
			dispatch(closeSearch());
		}

		if (searchTimeout !== false) {
			clearTimeout(searchTimeout);
		}

		setSearchTimeout(
			setTimeout(() => {
				if (searchValue.length > 0)
					dispatch(getSearchItems({ sector, searchValue }));
			}, 500),
		);
	}, [searchValue]);

	const handleChangeSearchValue = (val: string) => {
		setSearchValue(val);
	};

	const closeSearchDropDown = () => {
		dispatch(closeSearch());
	};

	const selectSearchItem = (id: string) => {
		navigate(`/catalog/product/${id}`);
	};

	return (
		<Select
			ref={searchInput}
			placeholder="Посик товаров"
			itemComponent={SelectItem}
			onChange={selectSearchItem}
			data={items as []}
			searchable
			maxDropdownHeight={400}
			nothingFound={
				<Center>
					<Group noWrap>
						Нет результатов <MoodSad color="#478dce" />
					</Group>
				</Center>
			}
			transition="pop-top-left"
			transitionDuration={300}
			transitionTimingFunction="ease"
			onSearchChange={handleChangeSearchValue}
			filter={(value, item) =>
				item.label!.toLowerCase().includes(value.toLowerCase().trim())
			}
			rightSection={isLoading ? <Loader size="xs" /> : <Search />}
			onDropdownClose={closeSearchDropDown}
		/>
	);
}
