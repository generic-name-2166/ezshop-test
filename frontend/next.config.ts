import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  // SSG
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
