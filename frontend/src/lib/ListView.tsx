"use client";

import type { JSX } from "react";
import {
  FETCH_ACTION,
  type Product,
  useProductDispatch,
  useProductSelector,
} from "./store.ts";

function ProductView({ name, urls }: Product): JSX.Element {
  return (
    <div>
      <h2>{name}</h2>
      <div>
        {urls.map((url) => (
          <img key={url} src={url} alt={name} />
        ))}
      </div>
    </div>
  );
}

export default function ListView(): JSX.Element {
  const products: Product[] = useProductSelector(
    (state) => state?.products ?? [],
  );
  const dispatch = useProductDispatch();

  const click = () => dispatch(FETCH_ACTION);

  return (
    <div>
      <button
        type="button"
        onClick={click}
        className="mx-2 rounded-lg border p-2 text-blue-500 hover:bg-blue-300"
      >
        Refresh
      </button>
      {products.map((product) => (
        <ProductView
          key={product.name}
          name={product.name}
          urls={product.urls}
        />
      ))}
    </div>
  );
}
