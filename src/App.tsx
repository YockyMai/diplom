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
import { Layout } from './layouts/Layout';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';

import { NotificationsProvider } from '@mantine/notifications';
import { Product } from './pages/Product';
import { check } from './store/slices/userSlice';
import { TopScroll } from './components/UI/TopScroll';
import { getCart } from './store/slices/cartSlice';
import { Admin } from './pages/Admin';

function App() {
	const theme = useAppSelector(state => state.themeState.theme);
	const userId = useAppSelector(state => state.userState.user.id);
	const role = useAppSelector(state => state.userState.user.role);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(check());
	}, []);

	useEffect(() => {
		if (userId) dispatch(getCart(userId)); //getCart
	}, [userId]);

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
							<Route path={`catalog`}>
								<Route index element={<Catalog />} />
								<Route
									path="product/:id"
									element={<Product />}
								/>
							</Route>
							<Route path={RouteNames.CART} element={<Cart />} />
							{role === 'ADMIN' && (
								<Route
									path={RouteNames.ADMIN}
									element={<Admin />}
								/>
							)}
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
					<TopScroll />
				</div>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
