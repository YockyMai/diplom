import React from 'react';
import { Image } from '@mantine/core';
import { $SERVER_URL } from '../../http';

export const ImageServer = ({
	height,
	src,
}: {
	height?: number;
	src: string;
}) => {
	return (
		<Image
			alt="Изображение недоступно"
			height={height && `${height}px`}
			fit="contain"
			src={src}
		/>
	);
};
