import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SSR by removing static export
  // output: "export", // Removed for SSR

  images: {
    // Enable image optimization for better performance
    unoptimized: false, // Enable optimization for responsive images
    domains: [
      "https://www.365scores.com",
      "https://extraleicht.com/",
      "https://app.sustayn.de",
      "https://www.pflegehilfe.org/",
    ], // Add external image domains if needed
    formats: ["image/webp", "image/avif"],
    // Enhanced image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    // Removed conflicting CSP - using main headers CSP instead
  },

  // Remove GitHub Pages specific paths for Vercel
  // basePath: "/Portfolio", // Removed for Vercel
  // assetPrefix: "/Portfolio", // Removed for Vercel
  webpack(config) {
    // Remove the default Next.js svg loader if present
    config.module.rules = config.module.rules.map((rule: { test?: RegExp; exclude?: RegExp }) => {
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

    // Add file loader for PDF files
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
      generator: {
        filename: "static/documents/[name].[hash][ext]",
      },
    });

    return config;
  },
  // Headers are now handled by Vercel configuration
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Performance and caching headers
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com data:",
              "img-src 'self' data: https:",
              "connect-src 'self' https: vercel.live va.vercel-scripts.com vitals.vercel-insights.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Removed deprecated devIndicators options (Next.js 15 no longer supports them). If you need build status
  // visuals, consider a custom overlay component instead.
};

export default nextConfig;
