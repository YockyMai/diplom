import { Accordion, Container, Stack, Title } from "@mantine/core";
import React from "react";
import { AddBrand } from "../components/Admin/AddBrand";
import { AddProduct } from "../components/Admin/AddProduct";
import { AddSize } from "../components/Admin/AddSize";
import { AddType } from "../components/Admin/AddType";
import { AddSizeInstance } from "../components/Admin/AddSizeInstance";
import { DeleteBrand } from "../components/Admin/DeleteBrand";
import { DeleteProduct } from "../components/Admin/DeleteProduct";
import { DeleteType } from "../components/Admin/deleteType";
import { useAppSelector } from "../hooks/react-redux";
import EditProduct from "../components/Admin/EditProduct";

export const Admin = () => {
  const { username } = useAppSelector((state) => state.userState.user);

  return (
    <Container style={{ minHeight: "500px" }} mt={100}>
      <Title align="center" order={3}>
        Добро пожаловать {username}
      </Title>

      <Accordion mt={150}>
        <Accordion.Item label="Действия с товарами">
          <Stack>
            <AddProduct />
            <DeleteProduct />
            <EditProduct />
          </Stack>
        </Accordion.Item>
        <Accordion.Item label="Действия с брендами">
          <Stack>
            <AddBrand />
            <DeleteBrand />
          </Stack>
        </Accordion.Item>
        <Accordion.Item label="Действия с типами">
          <Stack>
            <AddType />
            <DeleteType />
          </Stack>
        </Accordion.Item>
        <Accordion.Item label="Действия с размерами">
          <Stack>
            <AddSize />
            <AddSizeInstance />
          </Stack>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
