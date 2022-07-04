import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ColorScheme } from '@mantine/core';
import { $authHost } from '../../http';

export interface ThemeState {
	theme: ColorScheme;
}

const initialState: ThemeState = {
	theme: (localStorage.getItem('theme') as ColorScheme) || 'light',
};

export const themeSlice = createSlice({
	name: 'themeState',
	initialState,
	reducers: {
		switchTheme: state => {
			if (state.theme === 'dark') {
				state.theme = 'light';
				localStorage.setItem('theme', 'light');
			} else {
				state.theme = 'dark';
				localStorage.setItem('theme', 'dark');
			}
		},
	},
});
export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
