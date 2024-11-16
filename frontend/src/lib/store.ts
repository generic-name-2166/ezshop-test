import {
  configureStore,
  createSlice,
  PayloadAction,
  type UnknownAction,
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
    fetchProducts(state: ProductState): ProductState {
      return state;
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
