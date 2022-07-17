import React, { FC, useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import {
	ActionIcon,
	Button,
	Center,
	Container,
	List,
	Modal,
	Stack,
	Title,
	Transition,
} from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
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
			if (productId)
				dispatch(createComment({ value, productId })).then(() => {
					onChange('');
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
					<RichTextEditor
						value={value}
						onChange={onChange}
						controls={[
							['bold', 'italic', 'underline', 'image'],
							['h1', 'h2', 'h3', 'h4'],
						]}
						style={{ maxWidth: '1200px', margin: '10px auto 0' }}
						placeholder="Напиши свой отзыв о товаре"
					/>

					<Button
						onClick={sendReview}
						disabled={value.length <= 11}
						mt="xs">
						Оставить отзыв
					</Button>

					<ActionIcon
						style={{
							position: 'absolute',
							top: 12,
							right: '10px',
							zIndex: 1,
						}}
						onClick={() => setEditorInfoModal(true)}>
						<InfoCircle size={48} strokeWidth={2} color="#FFF" />
					</ActionIcon>
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
								⌘ + B/ Ctrl + B— переключить жирный шрифт в
								текущем выделении
							</List.Item>
							<List.Item>
								⌘ + I/ Ctrl + I— переключить курсив в текущем
								выделении
							</List.Item>
							<List.Item>
								⌘ + U/ Ctrl + U— переключить формат
								подчеркивания в текущем выделении
							</List.Item>
							<List.Item>
								⌘ + option + 1/ Ctrl + Alt + 1— переключить
								заголовок в текущей строке
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
