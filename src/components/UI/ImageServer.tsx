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
			height={height && `${height}px`}
			fit="contain"
			src={`${$SERVER_URL}${src}`}
		/>
	);
};
