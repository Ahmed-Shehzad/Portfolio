/**
 * Environment Configuration
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_SITE_URL:
    process.env["NEXT_PUBLIC_SITE_URL"] ||
    (process.env.NODE_ENV === "production"
      ? "https://portfolio-azure-five-75.vercel.app"
      : "http://localhost:3000"),
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;
