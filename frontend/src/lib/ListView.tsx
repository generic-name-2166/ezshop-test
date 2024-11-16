"use client";

import type { JSX, MouseEventHandler } from "react";
import {
  fetchProducts,
  type Product,
  useProductDispatch,
  useProductSelector,
} from "./store.ts";

function ProductView({ name, urls }: Product): JSX.Element {
  return (
    <div>
      <h2>{name}</h2>
      <div className="flex flex-row">
        {urls.map((url) => (
          <img key={url} src={url} alt={name} height={96} width={96} />
        ))}
      </div>
    </div>
  );
}

function handleRefersh(
  dispatch: ReturnType<typeof useProductDispatch>,
): MouseEventHandler<HTMLButtonElement> {
  return async () => {
    const products: Product[] = await fetch("/api/products").then((resp) =>
      resp.json(),
    );
    dispatch(fetchProducts(products));
  };
}

export default function ListView(): JSX.Element {
  const products: Product[] = useProductSelector(
    //@ts-expect-error God knows why state is typed as a function but isn't one in reality
    (state) => state?.products.products ?? [],
  );
  const dispatch = useProductDispatch();

  const click = handleRefersh(dispatch);

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
