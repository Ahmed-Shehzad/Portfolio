import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./i18n/config";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as "en" | "de")) {
    notFound();
  }

  return {
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
    locale: locale as string,
  };
});
