"use client";

import Link from "next/link";
import type { JSX } from "react";
import ImageForm from "@/lib/ImageForm.tsx";
import MainForm from "@/lib/MainForm.tsx";
import Cross from "@/lib/Cross.tsx";

export default function AddPage(): JSX.Element {
  return (
    <form className="flex h-screen flex-col space-y-5 bg-gray-300">
      <h1 className="flex flex-row justify-between px-4 pt-4 font-bold text-lg">
        <span>Adding a product</span>{" "}
        <Link href="/">
          <Cross />
        </Link>
      </h1>
      <MainForm />
      <ImageForm />
      <div className="flex w-full grow justify-center bg-white px-5 py-1 align-bottom">
        <button
          type="submit"
          className="h-fit grow rounded-2xl bg-blue-500 py-3 font-bold text-white"
        >
          Add product
        </button>
      </div>
    </form>
  );
}
