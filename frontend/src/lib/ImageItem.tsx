"use client";

import { useRef, useState, type JSX } from "react";
import Cross from "./Cross.tsx";
import CarretUp from "./CarretUp.tsx";
import CarretDown from "./CarretDown.tsx";
import type { SerializedFile } from "./files.ts";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PreviewImage from "./PreviewImage.tsx";

export interface ImageItemProps {
  image: SerializedFile;
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
  const url = image.url;

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

      <PreviewImage url={url} />

      <div className="flex grow flex-col px-4 text-left">
        <p>{image.name}</p>
        <small className="text-gray-400">image</small>
      </div>
      <button type="button" onClick={remove} className="px-2 text-gray-400">
        <Cross />
      </button>
    </div>
  );
}
