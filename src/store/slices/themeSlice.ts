import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ColorScheme } from '@mantine/core';

export interface ThemeState {
	theme: ColorScheme;
}

const initialState: ThemeState = {
	theme: 'light',
};

export const themeSlice = createSlice({
	name: 'themeState',
	initialState,
	reducers: {
		switchTheme: state => {
			state.theme === 'light'
				? (state.theme = 'dark')
				: (state.theme = 'light');
		},
	},
});
export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
