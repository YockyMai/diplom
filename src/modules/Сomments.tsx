import React, { FC, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import {
	ActionIcon,
	Button,
	Center,
	Container,
	Group,
	Kbd,
	List,
	Modal,
	Stack,
	Textarea,
	Title,
	Transition,
} from '@mantine/core';
import { InfoCircle, MessageCircle, Typography } from 'tabler-icons-react';
import { UserComment } from '../components/UI/UserComment';
import { useAppDispatch, useAppSelector } from '../hooks/react-redux';
import { createComment, getAllComments } from '../store/slices/commentsSlice';
import { parseISO } from 'date-fns';
import { showNotification } from '@mantine/notifications';
import { AuthModal } from '../components/UI/AuthModal';
import { RatingModal } from '../components/UI/RatingModal';

interface Comments {
	productId?: string;
}

export const Сomments: FC<Comments> = ({ productId }) => {
	const dispatch = useAppDispatch();

	const comments = useAppSelector(state => state.commentsState.comments);
	const { isAuth } = useAppSelector(state => state.userState);

	const [value, onChange] = useState('');
	const [editorInfoModal, setEditorInfoModal] = useState(false);
	const [authModal, setAuthModal] = useState(false);

	const [ratingModal, setRatingModal] = useState(false);

	React.useEffect(() => {
		if (productId) dispatch(getAllComments(productId));
	}, [productId]);

	const sendReview = () => {
		if (!isAuth) {
			setAuthModal(true);
		} else {
			onChange(''.trim());
			if (productId)
				dispatch(createComment({ value, productId })).then(() => {
					setRatingModal(true);
				});
		}
	};

	return (
		<div style={{ position: 'relative' }}>
			<Container size="xl">
				<div
					style={{
						position: 'relative',
						maxWidth: '1200px',
						margin: '0 auto',
					}}>
					<Textarea
						mt="xl"
						value={value}
						onChange={e => onChange(e.currentTarget.value)}
						label={
							<Group>
								Ваш отзыв <Typography size={12} />
							</Group>
						}
						placeholder="Напишите отзыв о товаре"
						autosize
						onKeyDown={e => {
							if (
								e.keyCode == 13 &&
								!e.shiftKey &&
								value.trim().length > 3
							) {
								e.preventDefault();
								sendReview();
							}
						}}
					/>
					<Button
						onClick={sendReview}
						disabled={value.trim().length < 3}
						mt="xs">
						Оставить отзыв
					</Button>
				</div>

				<Title align="center" pl={20} pt={50} order={3}>
					{comments.length > 0
						? 'Отзывы'
						: 'На данный товар еще нет отзывов'}
				</Title>
				<Stack spacing="xl" my="xl">
					{comments.map(el => (
						<UserComment
							productId={Number(productId)}
							user={el.user}
							value={el.value}
							createdAt={el.createdAt}
							key={el.id}
						/>
					))}
				</Stack>

				<Modal
					opened={editorInfoModal}
					onClose={() => setEditorInfoModal(false)}
					size="xl">
					<Container mb={50} size="sm">
						<Title my="xl" align="center">
							Горячие клавиши
						</Title>
						<List spacing="sm">
							<List.Item>
								<Kbd>⌘ + B/ Ctrl + B</Kbd> — переключить жирный
								шрифт в текущем выделении
							</List.Item>
							<List.Item>
								<Kbd>⌘ + I/ Ctrl + I</Kbd> — переключить курсив
								в текущем выделении
							</List.Item>
							<List.Item>
								<Kbd>⌘ + U/ Ctrl + U</Kbd> — переключить формат
								подчеркивания в текущем выделении
							</List.Item>
						</List>
					</Container>
				</Modal>
			</Container>
			<AuthModal
				opened={authModal}
				onClose={() => setAuthModal(false)}
				text="Чтобы оставлять свои отзывы, нужно иметь свой аккаунт!"
			/>
			<RatingModal
				productId={Number(productId)}
				isOpen={ratingModal}
				setOpen={setRatingModal}
			/>
		</div>
	);
};
