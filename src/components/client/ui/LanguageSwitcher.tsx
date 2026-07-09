"use client";

import { localeConfig, type Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logger } from "@/shared/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isToggling, setIsToggling] = useState(false);

  // Handle language toggle
  const handleLocaleToggle = () => {
    if (isToggling) return; // Prevent double clicks

    setIsToggling(true);

    try {
      // Get current locale from pathname as backup
      const pathLocale = pathname.split("/")[1];
      const currentLocale = pathLocale === "de" || pathLocale === "en" ? pathLocale : locale;

      // Toggle between English and German
      const newLocale: Locale = currentLocale === "en" ? "de" : "en";

      // Extract the path without the locale prefix
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

      // Navigate to the new locale with the same path
      const newPath = `/${newLocale}${pathWithoutLocale}`;

      // Debug logging
      if (process.env.NODE_ENV === "development") {
        logger.debug("Language Switch Debug", {
          hookLocale: locale,
          pathLocale,
          currentLocale,
          newLocale,
          currentPathname: pathname,
          pathWithoutLocale,
          newPath,
        });
      }

      // Client-side navigation swaps the locale in place — no full page
      // reload, no white flash, scroll position preserved.
      router.replace(newPath, { scroll: false });

      // Reset toggle state after navigation
      setTimeout(() => setIsToggling(false), 500);
    } catch (error) {
      logger.error("Language switch error", error as Error);
      setIsToggling(false);
    }
  };

  // Get current locale from pathname as backup for UI display
  const pathLocale = pathname.split("/")[1];
  const displayLocale: Locale = pathLocale === "de" || pathLocale === "en" ? pathLocale : locale;
  const currentLocaleConfig = localeConfig[displayLocale];
  const targetLocale: Locale = displayLocale === "en" ? "de" : "en";
  const targetLocaleConfig = localeConfig[targetLocale];

  return (
    <div className={`glass-pill p-0.5 ${className}`}>
      <button
        onClick={handleLocaleToggle}
        disabled={isToggling}
        className="group text-ink relative flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/40 focus:ring-2 focus:ring-violet-300 focus:outline-none disabled:opacity-50"
        aria-label={`Switch to ${targetLocaleConfig.name}`}
        title={`Switch to ${targetLocaleConfig.name}`}
      >
        {/* Current Language - Highlighted with Header Style */}
        <div className="text-ink flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 shadow-sm transition-colors duration-200 hover:bg-white">
          <span className="text-base">{currentLocaleConfig.flag}</span>
          <span className="hidden font-semibold sm:block">{currentLocaleConfig.name}</span>
          <span className="font-semibold sm:hidden">{displayLocale.toUpperCase()}</span>
        </div>

        {/* Toggle Arrow with Animation */}
        <div className="relative">
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${
              isToggling ? "scale-110 rotate-180" : "group-hover:translate-x-0.5"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>

        {/* Target Language - Subdued */}
        <div className="text-ink-soft flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 hover:bg-white/50">
          <span className="text-base transition-all duration-200">{targetLocaleConfig.flag}</span>
          <span className="hidden font-medium sm:block">{targetLocaleConfig.name}</span>
          <span className="font-medium sm:hidden">{targetLocale.toUpperCase()}</span>
        </div>

        {/* Loading Indicator */}
        {isToggling && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet-200 border-t-violet-500" />
          </div>
        )}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
