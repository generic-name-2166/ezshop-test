"use client";

import type { JSX } from "react";
import Cross from "./Cross.tsx";
import CarretUp from "./CarretUp.tsx";
import CarretDown from "./CarretDown.tsx";

export interface ImageItemProps {
  image: File;
  remove(): void;
  up?: () => void;
  down?: () => void;
}

export default function ImageItem({
  image,
  remove,
  up,
  down,
}: ImageItemProps): JSX.Element {
  const url = URL.createObjectURL(image);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col px-2">
        <button
          type="button"
          className="rounded hover:bg-gray-400 active:outline active:outline-blue-500 disabled:text-gray-400 disabled:active:outline-none disabled:hover:bg-inherit"
          disabled={!up}
          onClick={up}
        >
          <CarretUp />
        </button>
        <button
          type="button"
          className="rounded hover:bg-gray-400 active:outline active:outline-blue-500 disabled:text-gray-400 disabled:active:outline-none disabled:hover:bg-inherit"
          disabled={!down}
          onClick={down}
        >
          <CarretDown />
        </button>
      </div>
      <img
        src={url}
        alt="uploaded file"
        height={48}
        width={48}
        className="rounded"
      />
      <div className="flex grow flex-col px-4 text-left">
        <p>{image.name}</p>
        <small className="text-gray-400">image</small>
      </div>
      <button type="button" onClick={remove} className="px-2">
        <Cross />
      </button>
    </div>
  );
}
