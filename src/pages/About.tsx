import {
	Container,
	Title,
	Image,
	Group,
	List,
	ThemeIcon,
	AspectRatio,
} from '@mantine/core';
import React from 'react';
import { CircleCheck } from 'tabler-icons-react';
import banner from '../assets/images/banner.jpg';

export const About = () => {
	return (
		<Container size="xl">
			<Group position="apart" mt={100} align="center">
				<Title
					order={2}
					align="center"
					style={{ textTransform: 'uppercase', margin: '0 auto' }}>
					sneakers-always маркетплейс
				</Title>
				<Image src={banner} />
				<Title
					style={{ margin: '20px auto 0px auto' }}
					align="center"
					order={2}>
					Почему именно мы?
				</Title>

				<List
					spacing="md"
					style={{ margin: '0 auto' }}
					icon={
						<ThemeIcon color="teal" size={24} radius="xl">
							<CircleCheck size={16} />
						</ThemeIcon>
					}>
					<List.Item>
						Большой выбор оригинальной спортивной обуви, одежды и
						аксессуаров мировых торговых марок. Гарантия отсутствия
						подделок;
					</List.Item>
					<List.Item>
						Лояльная ценовая политика, направленная на то, чтобы
						дать возможность покупателям приобретать наши товарные
						позиции выгодно;
					</List.Item>
					<List.Item>
						Все реализуемые изделия проверяются в аутентификационном
						центре;
					</List.Item>
					<List.Item>
						Своим покупателям мы гарантируем оригинальность,
						надёжность и функциональность всех реализуемых товаров;
					</List.Item>
					<List.Item>
						Оперативная обработка заказов, и их быстрая доставка;
					</List.Item>
					<List.Item>
						Индивидуальный подход и помощь в подборе необходимых
						товаров.
					</List.Item>
				</List>
			</Group>

			<Title order={2} style={{ marginTop: 100 }} mb="xl">
				Мы на карте!
			</Title>
			<AspectRatio ratio={16 / 6}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.4060661102209!2d55.95101525644837!3d54.73621662996031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d93a6a4362416f%3A0x53e627c568e62f75!2z0KPRhNC40LzRgdC60LjQuSDQsNCy0LjQsNGG0LjQvtC90L3Ri9C5INGC0LXRhdC90LjQutGD0Lw!5e0!3m2!1sru!2sru!4v1656150905802!5m2!1sru!2sru"
					title="Google map"
					frameBorder="0"
					style={{ borderRadius: 10 }}
				/>
			</AspectRatio>
		</Container>
	);
};
