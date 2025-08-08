import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd && {
    output: "export",
  }),
  images: {
    // Always unoptimized for static export compatibility
    // In development, we'll handle optimization through our OptimizedImage component
    unoptimized: true,
  },
  ...(isProd && {
    basePath: "/Portfolio",
    assetPrefix: "/Portfolio",
  }),
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
              plugins: ["preset-default", { name: "removeViewBox", active: false }],
            },
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
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
