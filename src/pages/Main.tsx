import React from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  List,
  Center,
  Button,
  Alert,
} from "@mantine/core";
import { CatalogLinkCards } from "../components/CatalogLinkCards";
import { CirclePlus, UserCircle } from "tabler-icons-react";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <Container mt={100} size={"xl"}>
      <Stack style={{ textAlign: "center" }}>
        <Title order={2} align={"center"}>
          Добро пожаловать, мы - Sneakers always, онлайн магазин который готов
          предоставить тебе качественный товар!
        </Title>
        <Text size="lg" mb={50} color={"dimmed"}>
          Выбирай свою категорию и бегом за покупками!
        </Text>
        <CatalogLinkCards />
      </Stack>
      <Container mt={80} size={"sm"}>
        <Alert
          title={
            <Text align={"center"} weight={900}>
              Зарегистрируйтесь на нашем сайте и получите следующие
              преимущества:
            </Text>
          }
        >
          <Stack align={"left"} mt="xl">
            <Center>
              <List spacing={4}>
                <List.Item icon={<CirclePlus color={"#228DE9"} />}>
                  Доступ к премиум товарам высшего качества.
                </List.Item>
                <List.Item icon={<CirclePlus color={"#228DE9"} />}>
                  Возможность добавлять товары в корзину и совершать покупки.
                </List.Item>
                <List.Item icon={<CirclePlus color={"#228DE9"} />}>
                  Возможность комментировать и оставлять отзывы о товарах.
                </List.Item>
              </List>
            </Center>
            <Button
              mb={"sm"}
              leftIcon={<UserCircle />}
              component={Link}
              to={"/auth/signup"}
              m={"auto"}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </Alert>
      </Container>
    </Container>
  );
};
