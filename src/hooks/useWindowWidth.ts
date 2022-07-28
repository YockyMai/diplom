import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	const setWidth = (ev: Event) => {
		const window = ev.currentTarget as Window;
		setWindowSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', setWidth);

		return () => {
			window.removeEventListener('resize', setWidth);
		};
	}, []);

	return windowSize;
};
