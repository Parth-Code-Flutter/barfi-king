import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The in-app browser opens 127.0.0.1 while Next prints localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
