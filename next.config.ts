import type { Configuration, RuleSetRule } from "webpack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config: Configuration): Configuration {
    // Ensure rules array is present
    if (!config.module?.rules) {
      config.module = { rules: [] };
    }

    // Find the rule handling SVG files
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule & { test: RegExp } =>
        typeof rule === "object" &&
        rule !== null &&
        !!rule.test &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (!fileLoaderRule) {
      throw new Error("Could not find existing SVG rule in webpack config.");
    }

    // Push the new rules
    config.module?.rules?.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: (fileLoaderRule as any).issuer,
        resourceQuery: {
          not: [/url/],
        },
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );

    // Exclude SVGs from the original rule
    fileLoaderRule.exclude ??= [];

    if (!Array.isArray(fileLoaderRule.exclude)) {
      fileLoaderRule.exclude = [fileLoaderRule.exclude];
    }

    fileLoaderRule.exclude.push(/\.svg$/i);

    return config;
  },
};

export default nextConfig;
