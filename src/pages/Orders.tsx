import { Text, Mark, Accordion, Stack, Table } from "@mantine/core";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { getOrders } from "../store/slices/orderSlice";
import { format, parseISO } from "date-fns";
import currencyStringsFormatter from "../utils/currencyStringsFormatter";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orderState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      {orders?.length ? (
        <Accordion>
          {orders?.map((order) => (
            <Accordion.Item label={`Заказ номер ${order.id}`}>
              <Stack align="center">
                <Text align="right">
                  {"Был оформлен " +
                    format(parseISO(order.createdAt), "yyyy-MM-dd 'в' H:m")}
                </Text>
                <Text align="right">Самовывоз на адресс: {order.address}</Text>
                <Text align="right">
                  Заказ можно забрать в течении одной рабочей недели
                </Text>
              </Stack>

              <Text px="xl" py="xs">
                Заказ включает в себя :
              </Text>

              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Размер</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_products.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() =>
                        navigate(`/catalog/product/${item.product.id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{item.product.name}</td>
                      <td>{item.size.size}</td>
                      <td>
                        {currencyStringsFormatter.format(
                          item.product.discountPrice || item.product.price
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Text mt="xl" mb="sm">
                Сумма заказа :
                {" " + currencyStringsFormatter.format(order.sum_price)}
              </Text>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Text size="xl" align="center" mt="20%">
          Вы еще ничего не заказывали!
        </Text>
      )}
    </div>
  );
};
