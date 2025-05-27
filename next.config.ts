import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const imagePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "*",
  },
];

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: imagePatterns,
  },
  experimental: {
    ppr: "incremental",
  },

  devIndicators: {
    position: "bottom-left",
  },

  // devServer: {
  //   allowedDevOrigins: ["http://192.168.1.21:3000"],
  // },
};

export default nextConfig;
