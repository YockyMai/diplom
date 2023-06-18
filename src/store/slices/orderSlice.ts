import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $authHost } from "../../http";
import { IProduct } from "../../types/objects/product";

export interface IOrder {
  id: number;
  address: string;
  status: "active" | "closed";
  createdAt: string;
  updatedAt: string;
  userId: number;
  sum_price: number;
  order_products: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      product: IProduct;
      size: {
        id: number;
        size: number;
      };
    }
  ];
}

export interface orderState {
  orders?: IOrder[];
}

const initialState: orderState = {};

export const getOrders = createAsyncThunk(
  "orderSlice/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IOrder[]> = await $authHost.get(
        "api/order/"
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

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      console.log(action);
      action.payload.forEach((order, index) => {
        let sum = 0;
        order.order_products.forEach((product) => {
          sum = sum + (product.product.discountPrice || product.product.price);
        });

        if (state.orders) state.orders[index].sum_price = sum;
      });
    });
    builder.addCase(getOrders.rejected, (state, action) => {});
  },
});

export default orderSlice.reducer;
