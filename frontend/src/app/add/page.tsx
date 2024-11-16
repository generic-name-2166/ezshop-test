"use client";

import Link from "next/link";
import type { JSX } from "react";
import ImageForm from "@/lib/ImageForm.tsx";
import MainForm from "@/lib/MainForm.tsx";
import Cross from "@/lib/Cross.tsx";

export default function AddPage(): JSX.Element {
  return (
    <form className="flex h-screen flex-col space-y-5 bg-gray-300">
      <h1 className="px-4 pt-4 font-bold text-lg flex flex-row justify-between"><span>Adding a product</span> <Link href="/"><Cross /></Link></h1>
      <MainForm />
      <ImageForm />
      <button type="submit">Add product</button>
    </form>
  );
}
