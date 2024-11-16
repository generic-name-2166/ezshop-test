import { configureStore, type UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export interface Product {
  name: string;
  urls: string[];
}

export interface FetchAction extends UnknownAction {
  type: "product/fetch";
}
export const FETCH_ACTION: FetchAction = { type: "product/fetch" };

type ProductAction = FetchAction;

export interface ProductState {
  products: Product[];
}

const preloadedState: ProductState = {
  products: [],
};

function reducer(
  store: ProductState | undefined,
  action: ProductAction,
): ProductState {
  const state = store ?? preloadedState;
  switch (action.type) {
    case "product/fetch":
      // TODO
      return state;
  }
}

export const products = configureStore({
  reducer,
  preloadedState,
});

export const useProductDispatch =
  useDispatch.withTypes<typeof products.dispatch>();
export const useProductSelector =
  useSelector.withTypes<typeof products.getState>();
