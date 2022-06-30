import React, { FC, useState, useEffect } from 'react';
import {
	Button,
	Container,
	Stepper,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { SignUp } from '../components/SignUp';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Login } from '../components/Login';
import { RouteNames } from '../types/enums/router';

export const Auth: FC = () => {
	const [activeStep, setStep] = useState<number>(0);

	const nextStep = () =>
		setStep(current => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setStep(current => (current > 0 ? current - 1 : current));

	const theme = useMantineTheme();

	let navigate = useNavigate();

	useEffect(() => {
		if (activeStep === 0) navigate(RouteNames.SIGN_UP);
		if (activeStep === 1) navigate(RouteNames.LOGIN);
		if (activeStep === 2) navigate(RouteNames.MAIN);
	}, [activeStep]);

	return (
		<div>
			<Stepper
				style={{ width: '80%', margin: '0 auto', paddingTop: 50 }}
				active={activeStep}
				onStepClick={setStep}
				breakpoint="sm">
				<Stepper.Step
					label="Шаг первый"
					description="Создайте аккаунт"
				/>

				<Stepper.Step
					label="Шаг второй"
					description="Войдите в аккаунт"
				/>

				<Stepper.Step
					label="Шаг третий"
					description="Добавляйте товар в корзину"
					allowStepSelect={activeStep > 2}
				/>
			</Stepper>
			<Container py="8%" size="md" mt="lg">
				<Outlet />
				<Link to="/">
					<Button
						variant="subtle"
						color={theme.colorScheme === 'dark' ? 'blue' : 'pink'}
						style={{
							position: 'absolute',
							bottom: 10,
							left: '50%',
							transform: 'translateX(-50%)',
							fontWeight: 400,
						}}>
						На главную
					</Button>
				</Link>
			</Container>
		</div>
	);
};
