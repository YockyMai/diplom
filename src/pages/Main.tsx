import {
	Container,
	Group,
	Title,
	Text,
	SimpleGrid,
	Center,
	AspectRatio,
	Image,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'tabler-icons-react';
import { ProductCard } from '../components/ProductCard';
import banner from '../assets/images/banner.jpg';

export const Main = () => {
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
				<div style={{ margin: '0 auto' }}>
					<Text align="center">
						* Большой выбор оригинальной спортивной обуви, одежды и
						аксессуаров мировых торговых марок. Гарантия отсутствия
						подделок;
					</Text>
					<Text align="center">
						* Лояльная ценовая политика, направленная на то, чтобы
						дать возможность покупателям приобретать наши товарные
						позиции выгодно;
					</Text>
					<Text align="center">
						* Все реализуемые изделия проверяются в
						аутентификационном центре;
					</Text>
					<Text align="center">
						* Своим покупателям мы гарантируем оригинальность,
						надёжность и функциональность всех реализуемых товаров;
					</Text>
					<Text align="center">
						* Оперативная обработка заказов, и их быстрая доставка;
					</Text>
					<Text align="center">
						* Индивидуальный подход и помощь в подборе необходимых
						товаров.
					</Text>
				</div>
			</Group>
			{/* <Center>
				<SimpleGrid
					breakpoints={[
						{ maxWidth: 1480, cols: 3, spacing: 'md' },
						{ maxWidth: 1040, cols: 2, spacing: 'sm' },
						{ maxWidth: 800, cols: 1 },
					]}
					cols={4}>
					 <ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard /> 
				</SimpleGrid>
			</Center>

			<Group position="apart" mt={50} align="center">
				<Title order={2}>Новинки</Title>
				<Group>
					<Link to={'/'}>
						<Text variant="link">Все акции</Text>
					</Link>
					<ChevronRight />
				</Group>
			</Group>
			<Center>
				<SimpleGrid
					breakpoints={[
						{ maxWidth: 1480, cols: 3, spacing: 'md' },
						{ maxWidth: 1040, cols: 2, spacing: 'sm' },
						{ maxWidth: 800, cols: 1 },
					]}
					cols={4}>
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard /> 
				</SimpleGrid>
			</Center> */}

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
