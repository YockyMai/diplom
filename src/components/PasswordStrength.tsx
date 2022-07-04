import { Popover, Progress, PasswordInput } from '@mantine/core';
import { useState } from 'react';
import { PasswordRequirement } from './PasswordRequirement';

const requirements = [
	{ re: /[0-9]/, label: 'Включает цифры' },
	{ re: /[a-z]/, label: 'Включает строчные буква' },
	{ re: /[A-Z]/, label: 'Включает заглавные буквы' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Включает специальные символы' },
];

function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach(requirement => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function PasswordStrength() {
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [value, setValue] = useState('');
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(value)}
		/>
	));

	const strength = getStrength(value);
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

	return (
		<Popover
			opened={popoverOpened}
			position="bottom"
			placement="start"
			withArrow
			styles={{ popover: { width: '100%' } }}
			trapFocus={false}
			transition="pop-top-left"
			onFocusCapture={() => setPopoverOpened(true)}
			onBlurCapture={() => setPopoverOpened(false)}
			target={
				<PasswordInput
					required
					label="Пароль"
					placeholder="Пароль"
					description="Надежный пароль должен содержать буквы нижнего и верхнего регистра, не менее 1 цифры, не менее 1 специального символа."
					value={value}
					onChange={event => setValue(event.currentTarget.value)}
				/>
			}>
			<Progress
				color={color}
				value={strength}
				size={5}
				style={{ marginBottom: 10 }}
			/>
			<PasswordRequirement
				label="Должен содержать больше 6 символов"
				meets={value.length > 5}
			/>
			{checks}
		</Popover>
	);
}
