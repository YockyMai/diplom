import { showNotification } from '@mantine/notifications';

export const validError = (message: string) => {
	showNotification({
		color: 'red',
		title: 'Ошибка валидации',
		message,
	});
};
