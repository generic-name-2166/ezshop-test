"use client";

import {
  type ChangeEvent,
  type ChangeEventHandler,
  useId,
  useRef,
  useState,
  type JSX,
} from "react";
import ImageItem from "./ImageItem.tsx";
import Clip from "./Clip.tsx";

function handleFileChange(
  setImages: (set: (prev: File[]) => File[]) => void,
  available: number[],
  setAvailable: (set: (prev: number[]) => number[]) => void,
  setKeys: (set: (prev: number[]) => number[]) => void,
): ChangeEventHandler<HTMLInputElement> {
  return (event: ChangeEvent<HTMLInputElement>): void => {
    const newImages = Array.from(event.currentTarget.files ?? []);
    setImages((prevImages) => prevImages.concat(newImages));
    setKeys((prev) => prev.concat(available.slice(0, newImages.length)));
    setAvailable((prev) => prev.slice(newImages.length));
  };
}

function removeImage(
  setImages: (set: (prev: File[]) => File[]) => void,
  setAvailable: (set: (prev: number[]) => number[]) => void,
  setKeys: (set: (prev: number[]) => number[]) => void,
): (key: number, idx: number) => () => void {
  return (key: number, idx: number): (() => void) =>
    (): void => {
      setImages((prev) => prev.filter((_, i) => i !== idx));
      setAvailable((prev) => [...prev, key]);
      setKeys((prev) => prev.filter((value) => value !== key));
    };
}

export default function ImageForm(): JSX.Element {
  const uploadId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [available, setAvailable] = useState<number[]>([...Array(32).keys()]);
  const [keys, setKeys] = useState<number[]>([]);

  const change = handleFileChange(setImages, available, setAvailable, setKeys);
  const remove = removeImage(setImages, setAvailable, setKeys);

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
          <ImageItem key={keys[i]} image={image} remove={remove(keys[i], i)} />
        ))}
      </div>
    </fieldset>
  );
}
