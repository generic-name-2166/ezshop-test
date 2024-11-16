"use client";

import Link from "next/link";
import type { JSX } from "react";
import { Provider } from "react-redux";
import { products } from "@/lib/store.ts";
import ListView from "@/lib/ListView";

export default function Home(): JSX.Element {
  return (
    <Provider store={products}>
      <main className="flex flex-col">
        <p className="flex w-full justify-center p-2">
          <Link
            href="/add"
            className="flex w-full justify-center rounded-2xl bg-blue-500 py-2 text-white"
          >
            Add a product
          </Link>
        </p>
        <ListView />
      </main>
    </Provider>
  );
}
