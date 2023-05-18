import React from "react";
import { useNavigate } from "react-router-dom";
import { setCategoryId, setCurrentPage } from "../store/slices/filterSlice";
import { getAllProducts } from "../store/slices/productSlice";
import qs from "qs";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { Box, Group, Image, Text } from "@mantine/core";

const links = [
  {
    image:
      "https://static.street-beat.ru/upload/resize_cache/iblock/a02/420_500_1/a025b618649f75db3ce815596412189f.jpg",
    linkId: "1",
    text: "Мужская обувь",
  },
  {
    image:
      "https://static.street-beat.ru/upload/resize_cache/iblock/cfe/840_1000_1/cfec17092c91735c8af431b6f308d38a.jpg",
    linkId: "2",
    text: "Женская обувь",
  },
  {
    image:
      "https://static.street-beat.ru/upload/resize_cache/iblock/ddb/420_500_1/ddb9817afbb7377666258a8f6163c2c4.jpg",
    linkId: "3",
    text: "Детская обувь",
  },
];

export const CatalogLinkCards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { brandId, maxPrice, minPrice } = useAppSelector(
    (state) => state.filterState
  );

  const changeCurrentCategory = (categoryNumber: string) => {
    dispatch(setCategoryId(categoryNumber));
    const searchFiled = qs.stringify({
      brandId,
      currentPage: "1",
      minPrice,
      maxPrice,
      typeId: categoryNumber,
    });
    navigate(`/catalog/?${searchFiled}`);
    dispatch(setCurrentPage("1"));
    dispatch(
      getAllProducts({
        brandId,
        currentPage: "1",
        minPrice,
        maxPrice,

        typeId: categoryNumber,
      })
    );
  };

  return (
    <Group position="apart">
      {links.map(({ image, linkId, text }) => (
        <Box
          onClick={() => {
            changeCurrentCategory(linkId);
          }}
          style={{
            position: "relative",
            width: "30%",
            cursor: "pointer",
            transition: ".15s",
          }}
          sx={{
            "&:hover": {
              transform: "scale(1.1)",
              transition: ".15s",
            },
          }}
        >
          <Image style={{ filter: "brightness(0.8)" }} src={image} />
          <Text
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              textTransform: "uppercase",
              fontWeight: "400",
            }}
            size={"xl"}
            color={"#FFF"}
          >
            {text}
          </Text>
        </Box>
      ))}
    </Group>
  );
};
