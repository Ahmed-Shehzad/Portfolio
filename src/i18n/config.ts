export const defaultLocale = "en" as const;
export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const localeNames = {
  en: "English (UK)",
  de: "Deutsch (Deutschland)",
} as const;

export const localeConfig = {
  en: {
    name: "English (UK)",
    flag: "🇬🇧",
    dir: "ltr",
  },
  de: {
    name: "Deutsch (Deutschland)",
    flag: "🇩🇪",
    dir: "ltr",
  },
} as const;
