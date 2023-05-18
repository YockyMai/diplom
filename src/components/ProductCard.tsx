import {
  Card,
  Group,
  useMantineTheme,
  Text,
  Badge,
  Image,
  Center,
  Tooltip,
} from "@mantine/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../types/objects/product";
import currencyStringsFormatter from "../utils/currencyStringsFormatter";
import { ProductStars } from "./ProductStars";

interface ProductCard {
  product: IProduct;
}

export const ProductCard: FC<ProductCard> = ({ product }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div
      style={{
        width: 300,
        marginTop: 30,
      }}
    >
      <Link to={`/catalog/product/${product.id}`}>
        <Card radius="lg" shadow="sm" p="lg">
          <Card.Section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {product.discountPrice && (
              <Badge
                color={"green"}
                sx={{ position: "absolute", left: 10, top: 10, zIndex: 1 }}
              >
                <Text sx={{ textDecoration: "line-through" }}>
                  {product.price} ₽
                </Text>
              </Badge>
            )}
            <Center my={10}>
              {product.img ? (
                <Image
                  src={product.img}
                  alt="Изображение недоступно"
                  width={280}
                  style={{ minHeight: "280px" }}
                />
              ) : (
                ""
              )}
            </Center>
          </Card.Section>

          <Group position="apart" style={{ marginBottom: 20 }}>
            <Text weight={500}>{product.name}</Text>
          </Group>

          <Text
            size="sm"
            align="center"
            style={{ color: secondaryColor, lineHeight: 1.5 }}
          >
            {product.name}
          </Text>

          <Group mt="lg">
            {product.sizes.length > 0 && (
              <Tooltip label={product.sizes.map((el) => `${el.size.size}ru `)}>
                <Badge
                  style={{ fontWeight: 400 }}
                  variant="gradient"
                  gradient={{
                    from: "orange",
                    to: "red",
                  }}
                >
                  Доступные размеры
                </Badge>
              </Tooltip>
            )}

            {product.brand.name && (
              <Tooltip label={`Производитель ${product.brand.name}`}>
                <Badge
                  style={{ fontWeight: 400 }}
                  variant="gradient"
                  gradient={{
                    from: "orange",
                    to: "red",
                  }}
                >
                  {product.brand.name}
                </Badge>
              </Tooltip>
            )}

            {product.type.name && (
              <Tooltip
                label={`Этот товар относится к категории "${product.type.name}"`}
              >
                <Badge
                  style={{ fontWeight: 400 }}
                  variant="gradient"
                  gradient={{
                    from: "green",
                    to: "lime",
                  }}
                >
                  {product.type.name}
                </Badge>
              </Tooltip>
            )}
            {product.discountPrice && (
              <Tooltip
                label={`На этот товар действует скидка, изначальная цена ${product.price}`}
              >
                <Badge
                  style={{ fontWeight: 400 }}
                  variant="gradient"
                  gradient={{
                    from: "green",
                    to: "lime",
                  }}
                >
                  Скидка
                </Badge>
              </Tooltip>
            )}
          </Group>

          <Group position="apart" align="center">
            <div style={{ marginTop: "20px" }}>
              {product.rating > 0 ? (
                <ProductStars rating={product.rating} />
              ) : (
                <Text size="xs">Не оцененно</Text>
              )}
            </div>

            <Text align="right" mt="lg" size="lg" weight={500}>
              {currencyStringsFormatter.format(
                product.discountPrice || product.price
              )}
            </Text>
          </Group>
        </Card>
      </Link>
    </div>
  );
};
