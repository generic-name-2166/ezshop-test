"use client";

import {
  type ChangeEvent,
  type ChangeEventHandler,
  useId,
  useRef,
  useState,
  type JSX,
  Fragment,
} from "react";
import ImageItem from "./ImageItem.tsx";
import Clip from "./Clip.tsx";
import { useProductDispatch, useProductSelector } from "./store.ts";
import { replace, type SerializedFile, serializeFile } from "./files.ts";

function handleFileChange(
  setImages: (set: (prev: SerializedFile[]) => SerializedFile[]) => void,
  available: number[],
  setAvailable: (set: (prev: number[]) => number[]) => void,
  setKeys: (set: (prev: number[]) => number[]) => void,
): ChangeEventHandler<HTMLInputElement> {
  return (event: ChangeEvent<HTMLInputElement>): void => {
    const newImages = Array.from(event.currentTarget.files ?? []).map(
      serializeFile,
    );
    setImages((prevImages) => prevImages.concat(newImages));
    setKeys((prev) => prev.concat(available.slice(0, newImages.length)));
    setAvailable((prev) => prev.slice(newImages.length));
  };
}

function removeImage(
  setImages: (set: (prev: SerializedFile[]) => SerializedFile[]) => void,
  setAvailable: (set: (prev: number[]) => number[]) => void,
  setKeys: (set: (prev: number[]) => number[]) => void,
): (key: number, idx: number) => () => void {
  return (key: number, idx: number): (() => void) =>
    (): void => {
      setImages((prev) =>
        prev.filter((image, i) => {
          if (i === idx) {
            URL.revokeObjectURL(image.url);
            return false;
          }
          return true;
        }),
      );
      setAvailable((prev) => [...prev, key]);
      setKeys((prev) => prev.filter((value) => value !== key));
    };
}

function swapItems<T>(from: number, to: number): (array: T[]) => T[] {
  return (array: T[]): T[] => {
    const copy = [...array];
    copy[to] = array[from];
    copy[from] = array[to];
    return copy;
  };
}

function moveUp(
  setImages: (set: (prev: SerializedFile[]) => SerializedFile[]) => void,
  setKeys: (set: (prev: number[]) => number[]) => void,
): (idx: number) => (() => void) | undefined {
  return (idx: number): (() => void) | undefined =>
    idx <= 0
      ? undefined
      : (): void => {
          const swap = swapItems(idx, idx - 1);
          setImages(swap as (array: SerializedFile[]) => SerializedFile[]);
          setKeys(swap as (array: number[]) => number[]);
        };
}

function moveDown(
  setImages: (set: (prev: SerializedFile[]) => SerializedFile[]) => void,
  length: number,
  setKeys: (set: (prev: number[]) => number[]) => void,
): (idx: number) => (() => void) | undefined {
  return (idx: number): (() => void) | undefined =>
    idx >= length - 1
      ? undefined
      : (): void => {
          const swap = swapItems(idx, idx + 1);
          setImages(swap as (array: SerializedFile[]) => SerializedFile[]);
          setKeys(swap as (array: number[]) => number[]);
        };
}

export default function ImageForm(): JSX.Element {
  const uploadId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useProductDispatch();
  const images: SerializedFile[] = useProductSelector(
    //@ts-expect-error God knows why state is typed as a function but isn't one in reality
    (state) => state?.files.files ?? [],
  );
  const setImages = (set: (files: SerializedFile[]) => SerializedFile[]) =>
    dispatch(replace(set(images)));
  // const [images, setImages] = useState<File[]>([]);

  const [available, setAvailable] = useState<number[]>([...Array(32).keys()]);
  const [keys, setKeys] = useState<number[]>([]);

  const change = handleFileChange(setImages, available, setAvailable, setKeys);
  const remove = removeImage(setImages, setAvailable, setKeys);

  const up = moveUp(setImages, setKeys);
  const down = moveDown(setImages, keys.length, setKeys);

  return (
    <fieldset className="flex flex-col rounded-lg border bg-white p-4">
      <legend className="float-left font-bold text-blue-500">
        Product photo
      </legend>
      <label htmlFor={uploadId} className="space-x-3 p-4 text-blue-500">
        <Clip /> <span>Upload a file</span>
      </label>
      <input
        id={uploadId}
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={change}
        className="hidden"
      />
      <div>
        {images.map((image, i) => (
          <Fragment key={keys[i]}>
            {i !== 0 && <hr className="my-2" />}
            <ImageItem
              image={image}
              remove={remove(keys[i], i)}
              up={up(i)}
              down={down(i)}
            />
          </Fragment>
        ))}
      </div>
    </fieldset>
  );
}
