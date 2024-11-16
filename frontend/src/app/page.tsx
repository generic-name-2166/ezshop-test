import Link from "next/link";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="flex">
      <p className="flex w-full justify-center p-2">
        <Link
          href="/add"
          className="flex w-full justify-center rounded-2xl bg-blue-500 py-2 text-white"
        >
          Add a product
        </Link>
      </p>
    </main>
  );
}
