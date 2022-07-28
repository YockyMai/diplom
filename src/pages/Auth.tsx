import React, { FC, useState, useEffect, createContext } from 'react';
import {
	Button,
	Container,
	Stack,
	Stepper,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { RouteNames } from '../types/enums/router';
import { useAppSelector } from '../hooks/react-redux';

export const StepperProvider = createContext<{
	nextStep?: () => void;
	prevStep?: () => void;
}>({});

export const Auth: FC = () => {
	const { registerInProgress, loginInProgress, isAuth } = useAppSelector(
		state => state.userState,
	);
	let location = useLocation();
	let navigate = useNavigate();
	const theme = useMantineTheme();

	const [activeStep, setStep] = useState(
		location.pathname === '/auth/signup' ? 0 : 1,
	);

	const nextStep = () =>
		setStep(current => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setStep(current => (current > 0 ? current - 1 : current));

	const StepperContextValue = {
		nextStep,
		prevStep,
	};

	useEffect(() => {
		if (activeStep === 0) navigate(RouteNames.SIGN_UP, { replace: true });
		if (activeStep === 1) navigate(RouteNames.LOGIN, { replace: true });
		if (activeStep === 2) navigate(RouteNames.MAIN, { replace: true });
	}, [activeStep]);

	useEffect(() => {
		if (isAuth === true) navigate('/');
	}, [isAuth]);

	return (
		<div>
			<Stepper
				style={{ width: '80%', margin: '0 auto', paddingTop: 50 }}
				active={activeStep}
				onStepClick={setStep}
				breakpoint="sm">
				<Stepper.Step
					loading={registerInProgress}
					label="Шаг первый"
					description="Создайте аккаунт"
					// onClick={() => navigate()}
				/>

				<Stepper.Step
					loading={loginInProgress}
					label="Шаг второй"
					description="Войдите в аккаунт"
					// onClick={() => navigate()}
				/>

				<Stepper.Step
					label="Шаг третий"
					description="Добавляйте товар в корзину"
					allowStepSelect={activeStep > 2}
				/>
			</Stepper>
			<Container py="8%" size="md" mt="lg">
				<Stack align="center" justify="space-between">
					<StepperProvider.Provider value={StepperContextValue}>
						<Outlet context={nextStep} />
					</StepperProvider.Provider>

					<Link to="/">
						<Button
							variant="subtle"
							color={
								theme.colorScheme === 'dark' ? 'blue' : 'pink'
							}
							style={{
								fontWeight: 400,
							}}>
							На главную
						</Button>
					</Link>
				</Stack>
			</Container>
		</div>
	);
};
