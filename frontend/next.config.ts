import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

function main(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const rewrites = async () => [
    {
      source: "/api/:end",
      destination: "http://localhost:8000/api/:end",
    },
    {
      source: "/uploads/:file",
      destination: "http://localhost:8000/uploads/:file",
    },
  ];

  const nextConfig: NextConfig = {
    experimental: {
      reactCompiler: true,
    },
    // SSG
    output: "export",
    reactStrictMode: true,
  };

  return isDev
    ? {
        ...nextConfig,
        rewrites,
      }
    : nextConfig;
}

export default main;
