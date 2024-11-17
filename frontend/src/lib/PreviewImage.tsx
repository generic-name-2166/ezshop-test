"use client";

import { useRef, useState, type JSX } from "react";
import { ReactCrop, type Crop } from "react-image-crop";

export interface PreviewImageProps {
  url: string;
}

export default function PreviewImage({ url }: PreviewImageProps): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const [crop, setCrop] = useState<Crop>();

  const cancel = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()}>
        <img
          src={url}
          alt="uploaded file"
          height={48}
          width={48}
          className="rounded"
        />
      </button>
      <dialog ref={dialog} className="rounded-2xl">
        <div className="grid grid-cols-2 p-4">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={1}
            className="col-span-2 m-2"
          >
            <img src={url} alt="uploaded file" />
          </ReactCrop>

          <button
            type="button"
            onClick={cancel}
            className="mx-2 rounded-lg border border-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={cancel}
            className="mx-2 rounded-lg bg-blue-500 text-white"
          >
            Crop
          </button>
        </div>
      </dialog>
    </>
  );
}
