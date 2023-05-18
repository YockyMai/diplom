import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@mantine/core";
import { EditCircle } from "tabler-icons-react";
import { CatalogSearch } from "../../modules/CatalogSearch";
import { IProduct } from "../../types/objects/product";
import { getBrands, getOneProduct, getTypes } from "../../http/getApi";
import { editProduct } from "../../http/adminApi";
import { showNotification } from "@mantine/notifications";
import { ProductInfo } from "./ProductInfo";

const EditProduct = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);

  const [brandsData, setBrandsData] = useState<SelectItem[]>([]);
  const [typesData, setTypesData] = useState<SelectItem[]>([]);
  const [productName, setProductName] = useState("");
  const [selectedBrand, setBrand] = useState("");
  const [selectedType, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState<undefined | number>(
    undefined
  );
  const [productInfo, setProductInfo] = useState<
    { title: string; description: string }[]
  >([]);

  const resetStateValues = () => {
    setBrandsData([]);
    setDiscountPrice(undefined);
    setTypesData([]);
    setProductName("");
    setBrand("");
    setType("");
    setPrice(0);
    setProductInfo([]);
    setModalOpen(false);
    setPrice(0);
    setProduct(null);
    setProductId(null);
  };

  useEffect(() => {
    getBrands().then((brands) => {
      const fethingBrands: SelectItem[] = [];
      brands?.forEach((el: any) => {
        fethingBrands.push({
          value: String(el.id),
          label: el.name,
        });
      });
      setBrandsData([...fethingBrands]);
    });
    getTypes().then((types) => {
      const fethingTypes: SelectItem[] = [];
      types?.forEach((el: any) => {
        fethingTypes.push({ value: String(el.id), label: el.name });
      });
      setTypesData([...fethingTypes]);
    });
  }, [modalIsOpen]);

  useEffect(() => {
    if (productId)
      getOneProduct(productId).then((product) => {
        const productInfo = product.info.map((el: any) => ({
          title: el.title,
          description: el.description,
        }));
        setProduct(product);
        setProductInfo(productInfo);
        setDiscountPrice(product.discountPrice);
        setBrand(product.brandId.toString());
        setType(product.typeId.toString());
        setPrice(product.price);
        setProductName(product.name);
      });
  }, [productId]);

  const selectSearchItem = (id: string) => {
    setProductId(id);
  };

  const onEditProduct = () => {
    if (productId)
      editProduct(
        productId,
        productName,
        price.toString(),
        selectedBrand,
        selectedType,
        productInfo,
        discountPrice
      ).then(() => {
        setModalOpen(false);
        resetStateValues();
        showNotification({
          title: "Успешно",
          message: `Товар под ключевым номером "${productId}" изменен!`,
        });
      });
  };

  return (
    <div>
      <Alert title="Редактировать товар" icon={<EditCircle />} color="green">
        <Button color="green" mt={10} onClick={() => setModalOpen(true)}>
          Редактировать товар
        </Button>
      </Alert>
      <Modal
        size="xl"
        title={"Редактировать товар"}
        opened={modalIsOpen}
        onClose={() => {
          resetStateValues();
          setModalOpen(false);
        }}
      >
        <CatalogSearch
          label="Выберите товар для редактирования"
          selectSearchItem={selectSearchItem}
        />

        {product && (
          <>
            <Stack mt={"xl"}>
              <Divider />
              <TextInput
                value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
                label="Название товара"
                placeholder="Air Jordan"
                variant="filled"
                required
                maxLength={60}
              />
              <Select
                value={selectedBrand}
                onChange={(val) => val && setBrand(val)}
                label="Бренд"
                placeholder="Выберите один"
                data={brandsData}
                required
                maxLength={60}
                searchable
              />

              <Select
                value={selectedType}
                onChange={(val) => val && setType(val)}
                label="Тип"
                placeholder="Выберите один"
                data={typesData}
                required
                searchable
                maxLength={60}
              />
              <NumberInput
                error={
                  price > 100000 && "Значение должно быть меньше 100.000 ₽"
                }
                value={price}
                onChange={(val) => val && setPrice(val)}
                label="Стоимость"
                required
                placeholder="Введите цену"
                defaultValue={0}
                icon={"₽"}
                hideControls
                maxLength={6}
              />

              <Alert title={"Скидка"}>
                <NumberInput
                  error={
                    price > 100000 && "Значение должно быть меньше 100.000 ₽"
                  }
                  value={discountPrice}
                  onChange={(val) => setDiscountPrice(val)}
                  label="Стоимость со скидкой"
                  placeholder="Введите цену"
                  defaultValue={undefined}
                  icon={"₽"}
                  hideControls
                  maxLength={6}
                />
                {discountPrice && (
                  <Button
                    mt={"sm"}
                    color={"red"}
                    onClick={() => {
                      setDiscountPrice(undefined);
                    }}
                  >
                    Удалить скидку
                  </Button>
                )}
              </Alert>

              <ProductInfo
                productInfo={productInfo}
                setProductInfo={setProductInfo}
              />

              <Button mt={10} color="blue" onClick={onEditProduct}>
                Сохранить
              </Button>
            </Stack>
          </>
        )}
      </Modal>
    </div>
  );
};

export default EditProduct;
