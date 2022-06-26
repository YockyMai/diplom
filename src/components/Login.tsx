import React, { useState } from 'react';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

export const Login = () => {
	const schema = z.object({
		email: z.string().email({ message: 'Неверный формат email' }),
		password: z
			.string()
			.min(2, { message: 'Пароль должен быть длинее 2 символов' }),
	});
	const form = useForm({
		schema: zodResolver(schema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	return (
		<Box sx={{ maxWidth: 340 }} mx="auto">
			<form onSubmit={form.onSubmit(values => console.log(values))}>
				<TextInput
					required
					label="Email"
					placeholder="example@mail.com"
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					required
					label="Пароль"
					mt="sm"
					placeholder="Пароль"
					{...form.getInputProps('password')}
				/>

				<Group position="right" mt="xl">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
};
