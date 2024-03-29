import { showNotification } from "@mantine/notifications";
import { $authHost } from ".";
import { validError } from "../utils/validError";

export const createProduct = async (
  name: string,
  price: string,
  brandId: string,
  typeId: string,
  info: { title: string; description: string }[],
  filename: string,
  discountPrice: number | undefined
) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("info", JSON.stringify(info));
    formData.append("fileName", filename);
    if (discountPrice) {
      formData.append("discountPrice", discountPrice.toString());
    }

    const response = await $authHost.post("api/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {}
};

export const addSizesToProduct = async (
  productId: string,
  sizesData: { count: number; sizeId: number }[]
) => {
  try {
    const response = await $authHost.post("api/sizes/", {
      productId,
      sizesData,
    });

    if (response.status !== 200) {
      throw new Error("Server Error");
    }

    return response.data;
  } catch (error) {
    showNotification({
      title: "Ошибка!",
      color: "red",
      message: "Не удалось добавить размер",
    });
  }
};

export const createBrand = async (brandName: string) => {
  const res = await $authHost.post("/api/brand/", {
    name: brandName,
  });

  return res.data;
};

export const deleteBrand = async (brandId: string) => {
  const res = await $authHost.post("/api/brand/delete", {
    brandId,
  });

  return res.data;
};

export const createType = async (typeName: string) => {
  const res = await $authHost.post("/api/type/", {
    name: typeName,
  });

  return res.data;
};

export const deleteType = async (typeId: string) => {
  const res = await $authHost.post("/api/type/delete", {
    typeId,
  });

  return res.data;
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await $authHost.post("/api/product/delete/", {
      productId,
    });

    if (response.status !== 200) {
      throw new Error("Server Error");
    }

    return response.data;
  } catch (error) {
    validError("Такого товара уже не существует!");
  }
};

export const editProduct = async (
  productId: string,
  name: string,
  price: string,
  brandId: string,
  typeId: string,
  info: { title: string; description: string }[],
  discountPrice?: number
) => {
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("productId", productId);
    formData.append("price", price);
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("info", JSON.stringify(info));

    if (discountPrice) {
      formData.append("discountPrice", discountPrice.toString());
    }

    const response = await $authHost.post("/api/product/edit/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    validError("Такого товара уже не существует!");
  }
};

export const createSizeInstance = async (size: number) => {
  const response = await $authHost.post("/api/sizes/createIntance", {
    size,
  });

  return response.data;
};
