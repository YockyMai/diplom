import {
  Button,
  Card,
  Group,
  Text,
  Title,
  Mark,
  Grid,
  ActionIcon,
  Popover,
} from "@mantine/core";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "tabler-icons-react";
import { useAppDispatch } from "../hooks/react-redux";
import { deleteFromCart, getCartRes } from "../store/slices/cartSlice";
import currencyStringsFormatter from "../utils/currencyStringsFormatter";
import { ImageServer } from "./UI/ImageServer";

interface CartItem {
  cartItem: getCartRes;
}

export const CartItem: FC<CartItem> = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [popoverIsOpen, setPopoverOpen] = useState(false);

  const findSimilarProducts = () => {
    navigate(
      `/catalog?brandId=${cartItem.product.brand.id}&typeId=${cartItem.product.type.id}`
    );
  };

  const deleteProductFromCart = () => {
    setPopoverOpen(false);
    if (cartItem.size) dispatch(deleteFromCart(cartItem.id));
  };

  return (
    <Card shadow="xl" mt="xl">
      <Grid align="center" justify="space-between">
        <Grid.Col xs={12} sm={3} lg={2}>
          {cartItem.product.img ? (
            <ImageServer height={100} src={cartItem.product.img} />
          ) : (
            <Text>Нет изображения</Text>
          )}
        </Grid.Col>
        <Grid.Col xs={6} sm={5} lg={4}>
          <div>
            <Text size="sm">
              <Mark>{cartItem.product.brand.name}</Mark>
              {" " + cartItem.product.name}
            </Text>

            <Group>
              Размер :
              <Text weight={600}>{cartItem.size && cartItem.size.size}RU</Text>
            </Group>
          </div>
        </Grid.Col>
        <Grid.Col xs={6} sm={4} lg={2}>
          <Title align="right" order={2}>
            {currencyStringsFormatter.format(
              cartItem.product.discountPrice || cartItem.product.price
            )}
          </Title>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} lg={3}>
          <Group
            noWrap
            position="center"
            align="center"
            style={{ float: "right" }}
          >
            <Popover
              opened={popoverIsOpen}
              onClose={() => {
                setPopoverOpen(false);
              }}
              position="bottom"
              shadow="xl"
              target={
                <ActionIcon
                  onClick={() => {
                    setPopoverOpen(true);
                  }}
                  variant="transparent"
                  size="md"
                >
                  <Trash />
                </ActionIcon>
              }
            >
              <Text size="sm">Удалить {cartItem.product.name} с корзины?</Text>
              <Group mt="xl">
                <Button
                  onClick={() => {
                    setPopoverOpen(false);
                  }}
                  size="xs"
                  color="green"
                >
                  Отмена
                </Button>
                <Button onClick={deleteProductFromCart} size="xs" color="red">
                  Удалить
                </Button>
              </Group>
            </Popover>
            <Button onClick={findSimilarProducts}>Найти похожие</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
