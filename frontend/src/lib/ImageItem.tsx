"use client";

import type { JSX } from "react";
import Cross from "./Cross.tsx";

export interface ImageItemProps {
  image: File;
  remove(): void;
}

export default function ImageItem({
  image,
  remove,
}: ImageItemProps): JSX.Element {
  const url = URL.createObjectURL(image);
  return (
    <div className="m-2 flex flex-row justify-between">
      <img
        src={url}
        alt="uploaded file"
        height={48}
        width={48}
        className="rounded"
      />
      <div className="flex grow flex-col px-4 text-left">
        <p>{image.name}</p>
        <small>image</small>
      </div>
      <button type="button" onClick={remove}>
        <Cross />
      </button>
    </div>
  );
}
