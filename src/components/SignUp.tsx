import React, { useState } from 'react';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

export const SignUp = () => {
	const schema = z.object({
		name: z
			.string()
			.min(2, { message: 'Имя должно содержать минимум 2 символа' }),
		email: z.string().email({ message: 'Неверный формат' }),
		password: z
			.string()
			.min(6, { message: 'Минимальная длина пароля 6 символа' }),
	});

	const form = useForm({
		schema: zodResolver(schema),
		initialValues: {
			name: '',
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
				<TextInput
					required
					label="Имя пользователя"
					placeholder="Иван Иванович"
					mt="sm"
					{...form.getInputProps('name')}
				/>

				<PasswordInput
					required
					label="Пароль"
					mt="sm"
					placeholder="Пароль"
					{...form.getInputProps('password')}
				/>

				<Group position="right" mt="xl">
					<Button type="submit">Регистрация</Button>
				</Group>
			</form>
		</Box>
	);
};
