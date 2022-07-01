import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../modules/Header';
import { MyFooter } from '../MyFooter';

interface Layout {}

export const Layout: FC<Layout> = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<MyFooter />
		</div>
	);
};
