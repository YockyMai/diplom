import React from 'react';
import { Box, Text } from '@mantine/core';
import { Check, X } from 'tabler-icons-react';

export const PasswordRequirement = ({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) => {
	return (
		<Text
			color={meets ? 'teal' : 'red'}
			sx={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size="sm">
			{meets ? <Check /> : <X />} <Box ml={10}>{label}</Box>
		</Text>
	);
};
