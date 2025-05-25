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
};

export default nextConfig;
