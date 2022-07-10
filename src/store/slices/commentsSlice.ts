import { showNotification } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';
import { $authHost, $host } from '../../http';
import { IUser } from '../../types/objects/user';

export interface Icomment {
	id: number;
	value: string;
	createdAt: string;
	updatedAt: string;
	userId: number;
	productId: number;
	user: IUser;
}

export interface commentsSlice {
	comments: Icomment[];
}

export const getAllComments = createAsyncThunk(
	'commentsSlice/getAllComments',
	async (productId: string, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<Icomment[]> = await $host.get(
				`api/comment/product/${productId}`,
			);

			if (response.status !== 200) {
				throw new Error('Server Error');
			}

			const sortedArray = response.data.sort((a, b) => {
				if (parseISO(a.createdAt) < parseISO(b.createdAt)) {
					return 1;
				}
				if (parseISO(a.createdAt) > parseISO(b.createdAt)) {
					return -1;
				}
				return 0;
			});

			return sortedArray;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const createComment = createAsyncThunk(
	'commentsSlice/createComment',
	async (
		postData: { value: string; productId: string },
		{ rejectWithValue },
	) => {
		try {
			const response: AxiosResponse<Icomment> = await $authHost.post(
				`api/comment/create`,
				{
					value: postData.value,
					productId: postData.productId,
				},
			);

			if (response.status !== 200) {
				showNotification({
					title: 'Ошбика!',
					message: 'Что то пошло не так, попробуйте позже',
					color: 'red',
				});
				throw new Error('Server Error');
			}

			showNotification({
				title: 'Успешно!',
				message: 'Спасибо за отзыв',
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const initialState: commentsSlice = {
	comments: [],
};

const commentsSlice = createSlice({
	name: 'commentsSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAllComments.fulfilled, (state, action) => {
			state.comments = action.payload;
		});
		builder.addCase(getAllComments.rejected, (state, action) => {});

		builder.addCase(createComment.fulfilled, (state, action) => {
			state.comments.unshift(action.payload);
		});
	},
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
