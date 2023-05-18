import {
  Button,
  Indicator,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface ProductInfo {
  productInfo: { title: string; description: string }[];
  setProductInfo: Dispatch<
    SetStateAction<{ title: string; description: string }[]>
  >;
}

export const ProductInfo: FC<ProductInfo> = ({
  productInfo,
  setProductInfo,
}) => {
  const [infoTitle, setInfoTitle] = useState("");
  const [infoDescription, setInfoDescription] = useState("");

  const addInfo = () => {
    setProductInfo([
      ...productInfo,
      { title: infoTitle, description: infoDescription },
    ]);
    setInfoTitle("");
    setInfoDescription("");
  };

  const deleteInfoEl = (id: number) => {
    const updatedArr = [...productInfo].filter((_, index) => {
      if (index !== id) return true;
    });
    setProductInfo(updatedArr);
  };
  return (
    <Stack mt={30}>
      <Text>Информация о продукте</Text>
      <TextInput
        value={infoTitle}
        onChange={(e) => setInfoTitle(e.currentTarget.value)}
        label="Заголовок"
        placeholder="Заголовок описания"
        required
        maxLength={60}
      />
      <Indicator
        position="bottom-end"
        label={2000 - infoDescription.length}
        size={18}
      >
        <Textarea
          value={infoDescription}
          onChange={(e) => setInfoDescription(e.currentTarget.value)}
          label="Описание"
          placeholder="Текст описания"
          required
          autosize
          maxLength={2000}
        />
      </Indicator>

      <Button onClick={addInfo} color="green">
        Добавить описание
      </Button>

      {productInfo.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {productInfo.map((el, index) => (
              <tr key={el.description + index}>
                <td style={{ minWidth: 90 }}>{el.title}</td>
                <td style={{ whiteSpace: "pre-line" }}>
                  {el.description}
                  <br />
                  <Button
                    style={{
                      float: "right",
                      marginTop: "10px",
                    }}
                    color="red"
                    onClick={() => {
                      deleteInfoEl(index);
                    }}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
};
