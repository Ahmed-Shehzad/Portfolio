"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { localeConfig, type Locale } from "@/i18n/config";
import { useState, useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    startTransition(() => {
      // Remove the current locale from the pathname
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

      // Add the new locale to the pathname
      const newPath = newLocale === "en" ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;

      router.replace(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-white/15 bg-gray-800/50 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800"
        disabled={isPending}
      >
        <span>{localeConfig[locale].flag}</span>
        <span className="hidden sm:inline">{localeConfig[locale].name}</span>
        <svg
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 min-w-[200px] rounded-lg border border-white/15 bg-gray-900 shadow-xl">
          {Object.entries(localeConfig).map(([loc, config]) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc as Locale)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-800 ${
                locale === loc ? "bg-gray-800 text-emerald-400" : "text-white"
              }`}
              disabled={isPending || locale === loc}
            >
              <span className="text-lg">{config.flag}</span>
              <span>{config.name}</span>
              {locale === loc && (
                <svg
                  className="ml-auto size-4 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <button
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          aria-label="Close language selector"
        />
      )}
    </div>
  );
}
