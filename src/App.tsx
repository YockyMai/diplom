import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';

import { Main } from './pages/Main';
import './App.css';
import { useAppSelector } from './hooks/react-redux';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { RouteNames } from './types/router';
import { Catalog } from './pages/Catalog';

import { Auth } from './pages/Auth';
import { Layout } from './components/layouts/Layout';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

function App() {
	const theme = useAppSelector(state => state.themeState.theme);

	return (
		<MantineProvider
			theme={{
				fontFamily: 'Manrope, sans-serif',
				colorScheme: theme,
			}}
			withGlobalStyles>
			<div className="App">
				<Routes>
					<Route
						path={RouteNames.MAIN}
						element={
							<Layout>
								<Main />
							</Layout>
						}
					/>
					<Route
						path={RouteNames.CART}
						element={
							<Layout>
								<Cart />
							</Layout>
						}
					/>

					<Route
						path={'catalog'}
						element={
							<Layout>
								<Catalog />
							</Layout>
						}></Route>

					<Route path={RouteNames.AUTH} element={<Auth />}>
						<Route path={RouteNames.SIGN_UP} element={<SignUp />} />
						<Route path={RouteNames.LOGIN} element={<Login />} />
					</Route>
					<Route path="catalog" element={<Catalog />}>
						<Route path=":product_id" element={<></>} />
					</Route>
				</Routes>
			</div>
		</MantineProvider>
	);
}

export default App;
