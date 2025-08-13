// Centralized environment variable parsing & validation
// Extend when real env vars are introduced (client/server separation as needed)

interface PublicRuntimeConfig {
  APP_ENV: string; // NEXT_PUBLIC_APP_ENV
}

const read = (key: string, fallback = "") => process.env[key] ?? fallback;

export const env: PublicRuntimeConfig = {
  APP_ENV: read("NEXT_PUBLIC_APP_ENV", "development"),
};

export const isProd = env.APP_ENV === "production";
export const isDev = !isProd;
