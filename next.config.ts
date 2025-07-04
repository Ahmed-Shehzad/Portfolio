import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
        },
      ],
    });
    return config;
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
