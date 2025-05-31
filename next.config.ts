import {withSentryConfig} from "@sentry/nextjs";
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

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "erensahin",
project: "blog-next",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});