import {
	Button,
	Card,
	Container,
	Grid,
	Group,
	Image,
	Mark,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import React from 'react';
import { ShoppingCartPlus, Star } from 'tabler-icons-react';

export const Product = () => {
	const rating = 4;
	const availableRating = [1, 2, 3, 4, 5];

	return (
		<Container style={{ marginTop: '100px' }} size="xl">
			<Grid grow align="center" justify="center">
				<Grid.Col span={6}>
					<Image
						height="500px"
						fit="contain"
						src="https://static.street-beat.ru/upload/resize_cache/iblock/408/500_500_1/4085f347fa8f700a3f7b35e24215d4d4.jpg"
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Title order={2}>Описание</Title>
					<Text my="xl">
						Баскетбольные кроссовки Джордан (Air Jordan 4) –
						Четвертые именные кроссовки великого баскетболиста NBA
						Майкла Джордана. Выпущенные в 1989 году, они сразу
						покорили фанатов и ценителей баскетбольной обуви.
						Популярности Air Jordan 4 добавили рекламные ролики
						выпущенные талантливым режиссером и актером Спайком Ли.
						Преимущества модели, это боковая поддержка щиколотки,
						Air Bag в пятке для лучшей амортизации и прыгучести,
						высокая износостойкость и конечно же всеми узнаваемый
						ретро силуэт кроссовок, который не выходит из моды и в
						наше время.
					</Text>
					<Stack>
						<Card shadow="xl">
							<Container size="lg">
								<Card.Section py={10}>
									<Text size="lg" align="center">
										Кроссовки Air Jordan 4 Retro Metallic
										Red
									</Text>
								</Card.Section>
								<Card.Section pb={10}>
									<Group align="center">
										{availableRating.map((_, index) => (
											<>
												{index + 1 <= rating ? (
													<Star
														size={16}
														color="#f5cb25"
														fill="#f5cb25"
													/>
												) : (
													<Star
														size={16}
														color="#f5cb25"
													/>
												)}
											</>
										))}
										Средний рейтинг : {rating}
									</Group>
								</Card.Section>
								<Card.Section py={15}>
									<Title order={2}>29 999₽</Title>
								</Card.Section>

								<Card.Section>
									<Group>
										<Text>
											<Mark color="teal">Категории:</Mark>{' '}
											Nike, Мужская обувь
										</Text>
									</Group>
								</Card.Section>
								<Card.Section>
									<hr
										style={{
											width: '80%',
											margin: '15px auto',
										}}
									/>
									<Button
										style={{
											width: '100%',
											height: '50px',
										}}
										variant="gradient"
										gradient={{
											from: '#ed6ea0',
											to: '#ec8c69',
											deg: 35,
										}}
										rightIcon={<ShoppingCartPlus />}>
										Добавить в коризну
									</Button>
								</Card.Section>
							</Container>
						</Card>
					</Stack>
				</Grid.Col>
			</Grid>
		</Container>
	);
};
