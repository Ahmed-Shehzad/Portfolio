/**
 * Application Configuration
 *
 * Centralized configuration following bulletproof architecture.
 * Environment-specific settings should be managed here.
 */

export const APP_CONFIG = {
  // Application metadata
  name: "Muhammad Ahmed Shehzad Portfolio",
  version: "1.0.0",
  description: "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET",
  author: "Muhammad Ahmed Shehzad",

  // URLs and links
  urls: {
    portfolio: "https://muhammad-ahmed-shehzad.vercel.app",
    github: "https://github.com/Ahmed-Shehzad",
    linkedin: "https://linkedin.com/in/ahmed-shehzad",
    email: "mailto:shehzad@example.com",
  },

  // Social media handles
  social: {
    github: "Ahmed-Shehzad",
    linkedin: "ahmed-shehzad",
    twitter: "@ahmed_shehzad",
  },

  // Feature flags
  features: {
    webWorkers: true,
    analytics: false,
    darkMode: false, // Currently using fixed dark theme
    i18n: false,
  },

  // Performance settings
  performance: {
    imageOptimization: true,
    lazyLoading: true,
    preloadCriticalAssets: true,
  },

  // SEO settings
  seo: {
    defaultTitle: "Muhammad Ahmed Shehzad - Full Stack Developer",
    titleTemplate: "%s | Muhammad Ahmed Shehzad",
    defaultDescription:
      "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies.",
    keywords: [
      "Full Stack Developer",
      "TypeScript",
      "React",
      "Next.js",
      "C#",
      ".NET",
      "Web Development",
      "Frontend",
      "Backend",
    ],
    ogImage: "/og-image.jpg",
  },
} as const;

// Environment-specific configurations
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  // API endpoints (if needed)
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
    timeout: 10000,
  },

  // Analytics (if enabled)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
} as const;
