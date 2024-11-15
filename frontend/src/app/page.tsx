import type { JSX } from "react";
import ImageForm from "@/lib/ImageForm.tsx";
import MainForm from "@/lib/MainForm.tsx";

export default function Home(): JSX.Element {
  return (
    <div className="flex h-screen flex-col space-y-5 bg-gray-300">
      <h1 className="px-4 pt-4 font-bold text-lg">Adding a product</h1>
      <MainForm />
      <ImageForm />
    </div>
  );
}
