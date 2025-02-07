import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
        search: "",
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
