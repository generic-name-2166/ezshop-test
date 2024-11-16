import Link from "next/link";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main>
      <Link href="/add">Add a product</Link>
    </main>
  );
}
