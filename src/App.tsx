import React, { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';

import { Main } from './pages/Main';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/react-redux';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { RouteNames } from './types/enums/router';
import { Catalog } from './pages/Catalog';

import { Auth } from './pages/Auth';
import { Layout } from './components/layouts/Layout';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

import { NotificationsProvider } from '@mantine/notifications';
import { Product } from './pages/Product';
import { check } from './store/slices/userSlice';

function App() {
	const theme = useAppSelector(state => state.themeState.theme);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(check());
	}, []);

	return (
		<MantineProvider
			theme={{
				fontFamily: 'Manrope, sans-serif',
				colorScheme: theme,
			}}
			withGlobalStyles>
			<NotificationsProvider limit={5}>
				<div className="App">
					<Routes>
						<Route path={RouteNames.MAIN} element={<Layout />}>
							<Route index element={<Main />} />
							<Route path={`${RouteNames.CATALOG}/*`}>
								<Route index element={<Catalog />} />
								<Route path=":id" element={<Product />} />
							</Route>
							<Route path={RouteNames.CART} element={<Cart />} />
						</Route>

						<Route path={RouteNames.AUTH} element={<Auth />}>
							<Route index element={<SignUp />} />
							<Route
								path={RouteNames.SIGN_UP}
								element={<SignUp />}
							/>
							<Route
								path={RouteNames.LOGIN}
								element={<Login />}
							/>
						</Route>
					</Routes>
				</div>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
