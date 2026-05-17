import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix Turbopack root — prevent it from picking up parent lockfiles
  turbopack: {
    root: process.cwd(),
  },
  // Increase body size limit to 25MB for image/video base64 uploads
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
