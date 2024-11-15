import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { JSX } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ezshop",
  // description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
