import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 90, 92, 95, 100],
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