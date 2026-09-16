import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
  basePath: '/azizi-jewellery',
  assetPrefix: '/azizi-jewellery/',
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.0.197"],
  devIndicators: false,
};

export default nextConfig;
