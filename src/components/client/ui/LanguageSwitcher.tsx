"use client";

import { localeConfig, type Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logger } from "@/shared/utils";

interface LanguageSwitcherProps {
  className?: string;
}

const LOCALES: Locale[] = ["en", "de"];

/**
 * LanguageSwitcher
 *
 * Fixed-order segmented toggle (EN | DE) with a sliding knob. The two
 * languages never swap positions — only the highlight moves, like a native
 * switch control. The knob slides optimistically on tap for instant
 * feedback, then the locale swaps in place via soft client-side navigation
 * (no full reload, scroll preserved).
 */
export const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  // Locale we are navigating to; drives the knob before the route updates.
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  // Current locale from the pathname, with the hook value as backup.
  const pathLocale = pathname.split("/")[1];
  const routeLocale: Locale = pathLocale === "de" || pathLocale === "en" ? pathLocale : locale;
  const activeLocale: Locale = pendingLocale ?? routeLocale;

  // Once the route has caught up with the optimistic knob, clear the override.
  useEffect(() => {
    if (pendingLocale && routeLocale === pendingLocale) {
      setPendingLocale(null);
    }
  }, [pendingLocale, routeLocale]);

  const switchTo = (newLocale: Locale) => {
    if (newLocale === activeLocale) return;

    setPendingLocale(newLocale);

    try {
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
      router.replace(`/${newLocale}${pathWithoutLocale}`, { scroll: false });
    } catch (error) {
      logger.error("Language switch error", error as Error);
      setPendingLocale(null);
    }
  };

  const activeIndex = LOCALES.indexOf(activeLocale);

  return (
    <div className={`glass-pill p-0.5 ${className}`}>
      <div className="relative grid grid-cols-2" role="group" aria-label="Language">
        {/* Sliding knob — one segment wide, glides to the active language. */}
        <span
          aria-hidden="true"
          className="text-ink absolute inset-y-0 left-0 w-1/2 rounded-full bg-white/85 shadow-sm transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {LOCALES.map((code) => {
          const config = localeConfig[code];
          const isActive = code === activeLocale;
          return (
            <button
              key={code}
              onClick={() => switchTo(code)}
              className={`relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                isActive ? "text-ink font-semibold" : "text-ink-soft hover:text-ink font-medium"
              }`}
              aria-pressed={isActive}
              aria-label={`Switch to ${config.name}`}
              title={config.name}
            >
              <span className="text-base">{config.flag}</span>
              <span>{code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
