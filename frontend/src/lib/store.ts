import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import files from "./files.ts";

export interface Product {
  name: string;
  urls: string[];
}

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(
      _state: ProductState,
      action: PayloadAction<Product[]>,
    ): ProductState {
      return { products: action.payload };
    },
  },
});

export const { fetchProducts } = productSlice.actions;

export const products = configureStore({
  reducer: {
    products: productSlice.reducer,
    files,
  },
});

export const useProductDispatch =
  useDispatch.withTypes<typeof products.dispatch>();
export const useProductSelector =
  useSelector.withTypes<typeof products.getState>();
