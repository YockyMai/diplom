import React, { FC } from 'react';
import Header from '../../modules/Header';
import { MyFooter } from '../MyFooter';

interface Layout {
	children: React.ReactNode;
}

export const Layout: FC<Layout> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<MyFooter />
		</div>
	);
};
