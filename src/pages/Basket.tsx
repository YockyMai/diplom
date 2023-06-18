import React, { useState } from "react";
import {
  Button,
  Grid,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { CartItem } from "../components/CartItem";
import currencyStringsFormatter from "../utils/currencyStringsFormatter";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { placeOrder } from "../store/slices/cartSlice";
import { showNotification } from "@mantine/notifications";

export const Basket = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cartState.items);
  const totalPrice = useAppSelector((state) => state.cartState.totalPrice);

  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [orderModal, setOrderModal] = useState(false);

  const [showOrderInfo, switchShowOrderInfo] = useState(false);

  const openOrderModal = () => {
    setOrderModal(true);
  };

  const orderPayment = () => {
    if (!address) {
      showNotification({
        color: "red",
        message: "Заполните обязательные поля для самовывоза",
      });
      return;
    }

    setLoading(true);
    dispatch(placeOrder(address)).then(() => {
      setLoading(false);
    });
  };

  const closeOrderInfoModal = () => {
    if (showOrderInfo === true) {
      localStorage.setItem("show/orderInfo", "no");
    }
    setOrderModal(false);
  };

  return (
    <div>
      {items.length > 0 ? (
        <Grid grow justify="space-between">
          <Grid.Col lg={8}>
            {items.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </Grid.Col>

          <Grid.Col lg={4}>
            <Group pt={60} pb={20} grow position="center" align="center">
              <Text>{items.length} товара :</Text>
              <Text align="right">
                {" "}
                {currencyStringsFormatter.format(totalPrice)}
              </Text>
            </Group>

            <hr />

            <Table>
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.product.name}</td>
                    <td>{item.product.discountPrice || item.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Group pt={20} pb="xl" grow position="center" align="center">
              <Text>Итог :</Text>
              <Text align="right" size="xl" weight="600">
                {currencyStringsFormatter.format(totalPrice)}
              </Text>
            </Group>

            <Button
              onClick={openOrderModal}
              loading={isLoading}
              fullWidth
              color="orange"
            >
              Оформить заказ
            </Button>
          </Grid.Col>
        </Grid>
      ) : (
        <Text size="xl" align="center" mt="20%">
          Корзина пустая
        </Text>
      )}

      <Modal
        size="lg"
        title={items.length > 0 ? "Где заберете товар?" : "Готово!"}
        onClose={() => setOrderModal(false)}
        opened={orderModal}
      >
        {items.length > 0 ? (
          <Stack>
            <Select
              label={"Магазин"}
              placeholder={"Выберите точку где будете забирать заказ"}
              data={[
                {
                  value:
                    "ул. 50 лет Октября, 9, Уфа, Респ. Башкортостан, 450005",
                  label:
                    "ул. 50 лет Октября, 9, Уфа, Респ. Башкортостан, 450005",
                },
              ]}
              value={address}
              onChange={setAddress}
            />
            <Button loading={isLoading} onClick={orderPayment}>
              Готово!
            </Button>
          </Stack>
        ) : (
          <>
            <Title order={3} align="center" mt="xl">
              Заказ успешно оформлен
            </Title>
            <Text mt="xl">
              Перейдите в "Ваши заказы", чтобы просмотреть статус заказа
            </Text>
            <Text mt="xl">
              Там можно просмотреть ваши прошлые заказы и оставить отзыв о
              товаре!
            </Text>
            <Text mt="xl">
              Забрать товар можно по адресу - {address} в течении одной рабочей
              недели
            </Text>
            <Group position="apart" align="center" mt="xl">
              <Button onClick={closeOrderInfoModal}>Понятно</Button>
            </Group>
          </>
        )}
      </Modal>
    </div>
  );
};
