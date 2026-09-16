import type { NextConfig } from "next";

const basePath = "/azizi-jewellery";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  allowedDevOrigins: ["192.168.0.197"],
  devIndicators: false,
};

export default nextConfig;
