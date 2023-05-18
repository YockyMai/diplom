import { showNotification } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $authHost } from "../../http";
import { IProduct } from "../../types/objects/product";

export interface cartState {
  items: getCartRes[];
  totalPrice: number;
}

const initialState: cartState = {
  items: [],
  totalPrice: 0,
};

export interface getCartRes {
  id: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
  size: {
    id: number;
    size: number;
  };
}
export const getCart = createAsyncThunk(
  "cartSlice/getCart",
  async (id: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<getCartRes[]> = await $authHost.get(
        `api/basket/${id}`
      );

      if (response.status !== 200) {
        throw new Error("Server Error");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cartSlice/addProductToCart",
  async (
    productObj: { productId: number; sizeId: number },
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<getCartRes> = await $authHost.post(
        "/api/basket/create",
        {
          productId: productObj.productId,
          sizeId: productObj.sizeId,
        }
      );

      if (response.status !== 200) {
        throw new Error("Server Error");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "cartSlice/placeOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $authHost.post("api/order/");

      if (response.status !== 200) {
        throw new Error("Server Error");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cartSlice/deleteFromCart",
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      const response = await $authHost.post("api/basket/deleteOne", {
        id: cartItemId,
      });

      if (response.status !== 200) {
        showNotification({
          title: "Ошибка",
          message: "Не удалось выполнить действие, попробуйте позже",
          color: "red",
        });
        throw new Error("Server Error");
      }

      return cartItemId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    payment: () => {},
  },
  extraReducers(builder) {
    builder.addCase(getCart.fulfilled, (state, action) => {
      let totalPrice = 0;
      action.payload.forEach((element) => {
        totalPrice =
          totalPrice + (element.product.discountPrice || element.product.price);
      });

      state.totalPrice = totalPrice;
      state.items = action.payload;
    });

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.totalPrice =
        state.totalPrice +
        (action.payload.product.discountPrice || action.payload.product.price);
    });

    builder.addCase(placeOrder.fulfilled, (state) => {
      state.totalPrice = 0;
      state.items = [];
    });

    builder.addCase(placeOrder.rejected, (state) => {
      alert("error))");
    });

    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      const deletedItem = state.items.find((el) => el.id === action.payload)!;
      state.totalPrice =
        state.totalPrice -
        (deletedItem.product.discountPrice || deletedItem.product.price);
      state.items = state.items.filter((el) => el.id !== action.payload);
    });
  },
});

export const { payment } = cartSlice.actions;
export default cartSlice.reducer;
