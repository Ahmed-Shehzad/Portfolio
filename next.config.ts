import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Static HTML export (used for GitHub Pages) does NOT apply Next.js headers.
// Keeping a headers() function triggers the warning:
//  "rewrites, redirects, and headers are not applied when exporting"
// We conditionally disable headers in production export to avoid noisy logs
// while keeping them active during development (and optionally in prod if
// FORCE_HEADERS is set – e.g. when switching to a server runtime / Vercel).
const includeHeaders = !isProd || process.env.FORCE_HEADERS === "true";

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
  ...(includeHeaders && {
    async headers() {
      // NOTE: For static export these are ignored; enabled only when includeHeaders=true.
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-XSS-Protection", value: "1; mode=block" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Content-Security-Policy",
              // CSP kept concise; adjust as needed when moving to a non-export deployment.
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // consider removing 'unsafe-*' when possible
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
                "font-src 'self' fonts.gstatic.com",
                "img-src 'self' data: https:",
                "connect-src 'self' https:",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
              ].join("; "),
            },
          ],
        },
      ];
    },
  }),
  // Removed deprecated devIndicators options (Next.js 15 no longer supports them). If you need build status
  // visuals, consider a custom overlay component instead.
};

export default nextConfig;
