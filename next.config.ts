import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 2560],
    qualities: [75, 85, 90, 92, 95, 98, 100],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;