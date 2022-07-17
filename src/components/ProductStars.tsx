import { Group } from '@mantine/core';
import React from 'react';
import { Star } from 'tabler-icons-react';

const availableRating = [1, 2, 3, 4, 5];

export const ProductStars = ({ rating }: { rating: number }) => {
	return (
		<Group>
			{availableRating.map((_, index) => (
				<div key={index}>
					{index + 1 <= rating ? (
						<Star size={16} color="#f5cb25" fill="#f5cb25" />
					) : (
						<Star size={16} color="#f5cb25" />
					)}
				</div>
			))}
		</Group>
	);
};
