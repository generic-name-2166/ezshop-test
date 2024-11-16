import { useId, type JSX } from "react";

export default function MainForm(): JSX.Element {
  const nameId = useId();
  const descId = useId();

  return (
    <fieldset className="flex w-full flex-col space-y-3 rounded-lg border bg-white p-4">
      <legend className="float-left font-bold text-blue-500">
        Fill out the fields
      </legend>
      <div className="flex flex-col-reverse">
        <input
          id={nameId}
          className="peer rounded-lg border-2 border-gray-300 p-2 focus:outline-blue-500 active:outline-blue-500"
          name="product-name"
        />
        <label
          htmlFor={nameId}
          className="indent-1 font-bold text-gray-500 peer-focus:text-blue-500 peer-active:text-blue-500"
        >
          Product name
        </label>
      </div>
      <div className="flex flex-col-reverse">
        <textarea
          id={descId}
          className="peer rounded-lg border-2 border-gray-300 p-2 focus:outline-blue-500 active:outline-blue-500"
          name="product-desc"
        />
        <label
          htmlFor={descId}
          className="indent-1 font-bold text-gray-500 peer-focus:text-blue-500 peer-active:text-blue-500"
        >
          Description
        </label>
      </div>
    </fieldset>
  );
}
