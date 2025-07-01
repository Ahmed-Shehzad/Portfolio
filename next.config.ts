import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  devIndicators:
    process.env.NODE_ENV === "development"
      ? {
          buildActivity: true,
          position: "bottom-left",
          appIsrStatus: true,
          buildActivityPosition: "bottom-left",
        }
      : false,
};

export default nextConfig;
