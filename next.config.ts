import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/test-portfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
