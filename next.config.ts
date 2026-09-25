import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "", // Empty because it is running on the root domain
  },
  allowedDevOrigins: ["192.168.0.197"],
  devIndicators: false,
};

export default nextConfig;
