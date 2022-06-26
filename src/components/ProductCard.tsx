import {
	Card,
	Group,
	useMantineTheme,
	Text,
	Badge,
	Image,
	Button,
	Center,
	SimpleGrid,
	Tooltip,
} from '@mantine/core';
import React from 'react';

export const ProductCard = () => {
	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark'
			? theme.colors.dark[1]
			: theme.colors.gray[7];

	return (
		<div style={{ width: 300, marginTop: 30 }}>
			<Card radius="lg" shadow="sm" p="lg">
				<Card.Section
					style={{
						height: 250,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}>
					<Center>
						<Image
							src="https://pngimg.com/uploads/running_shoes/running_shoes_PNG5804.png"
							width={280}
						/>
					</Center>
				</Card.Section>

				<Group position="apart" style={{ marginBottom: 20 }}>
					<Text weight={500}> Reebok Classic Club C 85</Text>
				</Group>

				<Text
					size="sm"
					align="center"
					style={{ color: secondaryColor, lineHeight: 1.5 }}>
					Мужские кроссовки Reebok Classic Club C 85
				</Text>

				<SimpleGrid mt="lg" cols={4}>
					<Tooltip label="На данный товар сейчас действует скидка">
						<Badge
							style={{ fontWeight: 400 }}
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}>
							Скидка
						</Badge>
					</Tooltip>

					<Tooltip label="Свежий товар!">
						<Badge
							style={{ fontWeight: 400 }}
							variant="gradient"
							gradient={{ from: 'green', to: 'lime' }}>
							Новинка
						</Badge>
					</Tooltip>
				</SimpleGrid>

				<Button
					variant="outline"
					color="green"
					fullWidth
					style={{ marginTop: 14 }}>
					В корзину
				</Button>
				<Text align="right" mt="lg" size="sm" weight={500}>
					2300 ₽
				</Text>
			</Card>
		</div>
	);
};
