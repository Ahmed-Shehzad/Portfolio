import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.DEPLOYED_GITHUB_PATH ?? "",
  assetPrefix: process.env.DEPLOYED_GITHUB_PATH ?? "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    // Remove the default Next.js svg loader if present
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule?.test?.toString().includes("svg")) {
        return { ...rule, exclude: /\.svg$/ };
      }
      return rule;
    });
    // Add SVGR loader for all SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                "preset-default",
                { name: "removeViewBox", active: false },
              ],
            },
            titleProp: true,
          },
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
