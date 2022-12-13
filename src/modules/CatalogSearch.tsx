import { createRef, FC, forwardRef, useEffect, useState } from 'react';
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
					<Avatar src={img} />
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

interface CatalogSearchProps {
	selectSearchItem: (id: string) => any;
	label?: string;
}

export const CatalogSearch: FC<CatalogSearchProps> = ({
	selectSearchItem,
	label,
}) => {
	const dispatch = useAppDispatch();
	const { sector, isLoading, items } = useAppSelector(
		state => state.searchDropDownState,
	);

	const [isTyping, setTyping] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const searchInput = createRef<HTMLInputElement>();
	const [searchTimeout, setSearchTimeout] = useState<any>(false);

	useEffect(() => {
		if (searchValue.length === 0) {
			dispatch(closeSearch());
			setTyping(false);
		}

		if (searchTimeout !== false) {
			clearTimeout(searchTimeout);
			setTyping(true)
		}

		setSearchTimeout(
			setTimeout(() => {
				setTyping(false);
				if (searchValue.length > 0) {
					dispatch(getSearchItems({ sector, searchValue }));
				}
			}, 500),
		);
	}, [searchValue]);

	const handleChangeSearchValue = (val: string) => {
		setSearchValue(val);
	};

	const closeSearchDropDown = () => {
		dispatch(closeSearch());
	};

	return (
		<Select
			label={label}
			ref={searchInput}
			placeholder="Посик товаров"
			itemComponent={SelectItem}
			onChange={selectSearchItem}
			data={items as []}
			searchable
			maxDropdownHeight={400}
			maxLength={100}
			nothingFound={
				<Center>
					<Group noWrap>
						{isTyping || isLoading ? (
							<Loader size="xs" />
						) : searchValue.length === 0 ? (
							'Начните печатать, чтобы найти товар!'
						) : (
							<>
								Нет результатов <MoodSad color="#478dce" />
							</>
						)}
					</Group>
				</Center>
			}
			transition="pop-top-left"
			transitionDuration={300}
			transitionTimingFunction="ease"
			onSearchChange={handleChangeSearchValue}
			filter={(value, item) =>
				item
					.label!.toLowerCase()
					.includes(value.toLowerCase().trim()) ||
				item.type.toLowerCase().includes(value.toLowerCase().trim())
			}
			rightSection={<Search />}
			onDropdownClose={closeSearchDropDown}
		/>
	);
};
