import type { NextConfig } from "next";

// The project lives on an exFAT drive, where macOS writes a `._` sidecar file
// next to every file. Next's on-disk caches read those as real entries: the
// image optimizer serves them instead of the image, and Turbopack fails to
// reopen its cache. So both caches stay off.
const nextConfig: NextConfig = {
  // The in-app browser opens 127.0.0.1 while Next prints localhost.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
