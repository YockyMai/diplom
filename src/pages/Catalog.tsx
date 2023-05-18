import {
  Center,
  Grid,
  SimpleGrid,
  Title,
  Stack,
  Pagination,
  Skeleton,
  Group,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CatalogFilter } from "../components/CatalogFilter";
import { ProductCard } from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { setCurrentPage } from "../store/slices/filterSlice";
import { getAllProducts } from "../store/slices/productSlice";

interface Catalog {
  category?: string;
}

export const Catalog: FC<Catalog> = () => {
  const dispatch = useAppDispatch();
  const { items, count, itemsIsLoading } = useAppSelector(
    (state) => state.productsState
  );

  const navigate = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();

  const { brandId, typeId, currentPage, sizeId, minPrice, maxPrice, sortBy } =
    useAppSelector((state) => state.filterState);
  const [searchParams, setSearchParams] = useState<string>("");

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(Math.ceil(page)));
    navigate(
      `?${searchParams.replace(
        `currentPage=${currentPage}`,
        `currentPage=${page}`
      )}`
    );
    dispatch(
      getAllProducts({
        brandId,
        typeId,
        currentPage: String(page),
        minPrice,
        maxPrice,
        sizeId,
        sortBy,
      })
    );
    scrollTo({ y: 0 });
  };

  return (
    <Grid p={30} justify="center" grow gutter="md" style={{ paddingTop: 100 }}>
      <Grid.Col span={3}>
        <Center mt="30px">
          <CatalogFilter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </Center>
      </Grid.Col>

      <Grid.Col span={9}>
        <Center>
          {itemsIsLoading ? (
            <SimpleGrid
              breakpoints={[
                {
                  maxWidth: 1480,
                  cols: 3,
                  spacing: "md",
                },
                {
                  maxWidth: 1040,
                  cols: 2,
                  spacing: "sm",
                },
                { maxWidth: 800, cols: 1 },
              ]}
              cols={4}
            >
              {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
                <Stack mt={30} spacing="lg" p="md">
                  <Center>
                    <Skeleton height={280} width={280} radius="sm" />
                  </Center>

                  <Skeleton height={38} radius="sm" />

                  <Center>
                    <Skeleton height={20} width={120} radius="sm" />
                  </Center>

                  <Skeleton height={20} radius="sm" />

                  <Group position="apart">
                    <Skeleton height={30} width={140} radius="sm" />
                    <Skeleton height={30} width={70} radius="sm" />
                  </Group>
                </Stack>
              ))}
            </SimpleGrid>
          ) : (
            <>
              {items.length <= 0 ? (
                <Stack mt="23%" align="center">
                  <Title
                    align="center"
                    order={2}
                    style={{
                      width: "65%",
                      fontWeight: 200,
                    }}
                  >
                    Совпадений по вашему запросу не найдено 😞. Попробуйте
                    другой фильтр!
                  </Title>
                </Stack>
              ) : (
                <Stack align="flex-end">
                  <SimpleGrid
                    breakpoints={[
                      {
                        maxWidth: 1480,
                        cols: 3,
                        spacing: "md",
                      },
                      {
                        maxWidth: 1040,
                        cols: 2,
                        spacing: "sm",
                      },
                      { maxWidth: 800, cols: 1 },
                    ]}
                    cols={4}
                  >
                    {items.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </SimpleGrid>
                  <Pagination
                    page={Number(currentPage)}
                    onChange={handleChangePage}
                    py="xl"
                    total={Math.ceil(count / 8)}
                  />
                </Stack>
              )}
            </>
          )}
        </Center>
      </Grid.Col>
    </Grid>
  );
};
