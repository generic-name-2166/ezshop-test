"use client";

import Link from "next/link";
import type { FormEvent, FormEventHandler, JSX } from "react";
import { Provider } from "react-redux";
import ImageForm from "@/lib/ImageForm.tsx";
import MainForm from "@/lib/MainForm.tsx";
import Cross from "@/lib/Cross.tsx";
import {
  products,
  useProductDispatch,
  useProductSelector,
} from "@/lib/store.ts";
import { clear, deserializeFile, type SerializedFile } from "@/lib/files.ts";

function handleSubmit(
  images: SerializedFile[],
  clearImages: () => void,
): FormEventHandler<HTMLFormElement> {
  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const files: File[] = await Promise.all(images.map(deserializeFile));

    for (const file of files) {
      data.append("files", file);
    }

    await fetch("/api/products", {
      method: "POST",
      body: data,
    }).finally(() => {
      for (const image of images) {
        URL.revokeObjectURL(image.url);
      }
      clearImages();
      form.reset();
    });
  };
}

function AddPage(): JSX.Element {
  const dispatch = useProductDispatch();
  const images: SerializedFile[] = useProductSelector(
    //@ts-expect-error God knows why state is typed as a function but isn't one in reality
    (state) => state?.files.files ?? [],
  );
  const clearImages = () => dispatch(clear());

  const submit = handleSubmit(images, clearImages);

  return (
    <form
      className="flex h-screen flex-col space-y-5 bg-gray-300"
      onSubmit={submit}
    >
      <h1 className="flex flex-row justify-between px-4 pt-4 font-bold text-lg">
        <span>Adding a product</span>
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

export default function AddPageWrapper(): JSX.Element {
  return (
    <Provider store={products}>
      <AddPage />
    </Provider>
  );
}
