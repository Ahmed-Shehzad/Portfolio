"use client";

import { localeConfig, type Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
        console.warn("Language Switch Debug:", {
          hookLocale: locale,
          pathLocale,
          currentLocale,
          newLocale,
          currentPathname: pathname,
          pathWithoutLocale,
          newPath,
        });
      }

      // Use window.location for more reliable navigation
      if (typeof window !== "undefined") {
        window.location.href = newPath;
      } else {
        router.push(newPath);
      }

      // Reset toggle state after navigation
      setTimeout(() => setIsToggling(false), 500);
    } catch (error) {
      console.error("Language switch error:", error);
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
    <button
      onClick={handleLocaleToggle}
      disabled={isToggling}
      className={`group relative flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus:ring-2 focus:ring-emerald-500/50 focus:outline-none disabled:opacity-50 ${className}`}
      aria-label={`Switch to ${targetLocaleConfig.name}`}
      title={`Switch to ${targetLocaleConfig.name}`}
    >
      {/* Current Language */}
      <div className="flex items-center gap-2">
        <span className="text-base">{currentLocaleConfig.flag}</span>
        <span className="hidden sm:block">{currentLocaleConfig.name}</span>
        <span className="sm:hidden">{displayLocale.toUpperCase()}</span>
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

      {/* Target Language */}
      <div className="flex items-center gap-2 opacity-60 transition-opacity duration-200 group-hover:opacity-100">
        <span className="text-base">{targetLocaleConfig.flag}</span>
        <span className="hidden sm:block">{targetLocaleConfig.name}</span>
        <span className="sm:hidden">{targetLocale.toUpperCase()}</span>
      </div>

      {/* Loading Indicator */}
      {isToggling && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/5 backdrop-blur-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
        </div>
      )}
    </button>
  );
};

export default LanguageSwitcher;
