"use client";

import { useBfcacheCompatibleScrollListener } from "@/hooks/useBfcacheCompatible";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LanguageSwitcher } from "@/components";
import { env } from "@/config/env";
import { logger } from "@/shared/utils";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

interface HeaderOption {
  title: string;
  href: string;
  id: string; // Pre-computed id
  isExternal?: boolean; // Flag to indicate if this is an external page
  showInNavigation?: boolean; // Flag to control visibility in navigation
}

interface SectionElement {
  id: string;
  element: HTMLElement;
  offsetTop: number; // Cache offsetTop
}

interface NavigationItemProps {
  option: HeaderOption;
  isActive: boolean;
  onClick: (option: HeaderOption) => void;
}

// Constants for better maintainability
const SCROLL_OFFSET = 150;
const HEADER_OFFSET = 100;
const BOTTOM_THRESHOLD = 10;

// Base header options - will be enhanced with locale-aware URLs
const baseHeaderOptions = [
  { title: "Home", href: "/", id: "home" },
  { title: "Projects", href: "#projects", id: "projects" },
  { title: "About", href: "#about", id: "about" },
  { title: "Contact", href: "#contact", id: "contact" },
  { title: "Resume", href: "/resumes", id: "resumes", isExternal: true },
  {
    title: "Cover Letter",
    href: "/cover-letter",
    id: "cover-letter",
    isExternal: true,
    showInNavigation: env.isDevelopment, // Only show in nav during development
  },
];

// Function to create locale-aware header options
const createHeaderOptions = (locale: string): HeaderOption[] => {
  return baseHeaderOptions.map((option) => ({
    ...option,
    href: option.isExternal ? `/${locale}${option.href}` : option.href, // Keep hash links as-is for smooth scrolling
  }));
};

// Default header option for fallback scenarios
const DEFAULT_HEADER_OPTION: HeaderOption = {
  title: "Home",
  href: "#home",
  id: "home",
};

/**
 * NavigationItem – individual nav pill. Applies active styling and
 * smooth-scroll behavior via parent click handler.
 */
const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { option, isActive, onClick } = props;
  const isExternalPage = option.isExternal || false;
  const className = `nav-item block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 md:w-auto md:text-center md:py-2 md:rounded-full ${
    isActive && !isExternalPage
      ? "bg-white text-gray-900 hover:bg-white/90"
      : "text-white hover:bg-white/10 md:hover:bg-white/20"
  }`;

  if (isExternalPage) {
    const ariaLabel = `View ${option.title} Page`;
    return (
      <Link className={className} href={option.href} aria-label={ariaLabel}>
        {option.title}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={option.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(option);
      }}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Navigate to ${option.title} section`}
    >
      {option.title}
    </a>
  );
};

/**
 * Header
 *
 * Optimized navigation bar with scroll-position awareness and history hash sync.
 *
 * Features:
 * - Detects active section based on cached offsetTop values for O(n) backward scan.
 * - Smooth scrolling with header offset compensation.
 * - URL hash updated via replaceState (no history pollution).
 * - bfcache-compatible scroll listener hook for reliability on back/forward nav.
 *
 * Performance:
 * - Cached section offsets reduce layout thrash.
 * - Bottom-of-page detection to force highlight of last section.
 *
 * Accessibility:
 * - aria-current for active link; semantic nav landmark with role + label.
 */
export const Header = () => {
  const locale = useLocale();
  const { isMobile, isTablet } = useScreenSize();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine if we should show mobile UI (mobile or tablet)
  const showMobileUI = isMobile || isTablet;

  // Create locale-aware header options
  const headerOptions = useMemo(() => createHeaderOptions(locale), [locale]);

  const [activeOption, setActiveOption] = useState<HeaderOption>(
    baseHeaderOptions[0] || DEFAULT_HEADER_OPTION
  );
  const [sectionElements, setSectionElements] = useState<SectionElement[]>([]);

  // Initialize section elements after component mounts (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateElements = () => {
      if (typeof window === "undefined") return;

      const elements = headerOptions
        .filter((option) => option.href.startsWith("#")) // Only process hash-based sections
        .map((option) => {
          const element = document.getElementById(option.id);
          return element
            ? {
                id: option.id,
                element,
                offsetTop: element.offsetTop,
              }
            : null;
        })
        .filter((section): section is SectionElement => section !== null);

      setSectionElements(elements);
    };

    const handleResize = () => {
      updateElements();
    };

    updateElements();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [headerOptions]);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!showMobileUI && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [showMobileUI, isMobileMenuOpen]);

  // Memoize contact section for bottom detection
  const contactSection = useMemo(
    () => headerOptions.find((option) => option.id === "contact"),
    [headerOptions]
  );

  // Create lookup map for O(1) section id to HeaderOption mapping
  const optionsMap = useMemo(() => {
    const map = new Map<string, HeaderOption>();
    headerOptions
      .filter((option) => option.href.startsWith("#")) // Only hash-based sections
      .forEach((option) => map.set(option.id, option));
    return map;
  }, [headerOptions]);

  // Filter options for navigation display
  const navigationOptions = useMemo(() => {
    return headerOptions.filter((option) => option.showInNavigation !== false);
  }, [headerOptions]);

  // Optimized URL update function
  const updateURL = useCallback((section: HeaderOption) => {
    if (typeof window === "undefined") return; // SSR check

    // Only update URL for hash-based navigation, skip external URLs
    if (!section.href.startsWith("#")) return;

    const currentHash = window.location.hash;
    if (currentHash !== section.href) {
      const newUrl = `${window.location.pathname}${section.href}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  // Optimized active section detection
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined" || sectionElements.length === 0) return;

    const scrollPosition = window.scrollY + SCROLL_OFFSET;
    const windowBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - BOTTOM_THRESHOLD;
    const isAtBottom = windowBottom >= documentHeight;

    let currentSection = headerOptions[0];

    if (isAtBottom && contactSection) {
      currentSection = contactSection;
    } else {
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && scrollPosition >= section.offsetTop) {
          const matchingOption = optionsMap.get(section.id);
          if (matchingOption) {
            currentSection = matchingOption;
            break;
          }
        }
      }
    }

    if (currentSection) {
      updateURL(currentSection);
      setActiveOption(currentSection);
    }
  }, [sectionElements, contactSection, updateURL, optionsMap, headerOptions]);

  // Throttled scroll handler
  // Use bfcache-compatible scroll listener
  useBfcacheCompatibleScrollListener(updateActiveSection);

  // Set initial state after elements are loaded
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR check

    if (sectionElements.length > 0) {
      updateActiveSection();
    }
  }, [updateActiveSection, sectionElements]);

  // Optimized navigation click handler
  const handleNavClick = useCallback(
    (option: HeaderOption) => {
      setActiveOption(option);
      updateURL(option);
      setIsMobileMenuOpen(false); // Close mobile menu when navigation item is clicked

      if (typeof window === "undefined") return; // SSR check

      try {
        const element = document.getElementById(option.id);
        if (element && typeof element.offsetTop === "number") {
          const scrollToPosition = element.offsetTop - HEADER_OFFSET;
          window.scrollTo({
            top: Math.max(0, scrollToPosition),
            behavior: "smooth",
          });
        }
      } catch (error) {
        // Handle scrolling errors gracefully
        if (process.env.NODE_ENV === "development") {
          logger.warn(`Failed to scroll to section ${option.id}`, { error: error as Error });
        }
      }
    },
    [updateURL]
  );

  return (
    <>
      <header
        className="fixed top-0 z-10 w-full border-b border-white/10 bg-black/10 backdrop-blur-sm"
        role="banner"
      >
        <div
          className={`flex w-full items-center px-4 pt-8 pb-4 md:px-24 ${showMobileUI ? "justify-between" : "justify-center"}`}
        >
          {/* Mobile/Tablet menu button */}
          {showMobileUI && (
            <button
              className="flex h-8 w-8 flex-col items-center justify-center space-y-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          )}

          {/* Desktop navigation */}
          {!showMobileUI && (
            <div className="flex items-center gap-4">
              <nav
                className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-0.5 backdrop-blur"
                role="navigation"
                aria-label="Main navigation"
              >
                {navigationOptions.map((option) => (
                  <NavigationItem
                    key={option.title}
                    option={option}
                    isActive={activeOption.title === option.title}
                    onClick={handleNavClick}
                  />
                ))}
              </nav>
              <LanguageSwitcher />
            </div>
          )}

          {/* Mobile Language Switcher */}
          {showMobileUI && <LanguageSwitcher />}
        </div>
      </header>

      {/* Mobile/Tablet side drawer overlay */}
      {showMobileUI && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile/Tablet side drawer */}
      {showMobileUI && (
        <div
          className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-black/10 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white">Portfolio</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              aria-label="Close navigation menu"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer navigation */}
          <nav
            className="flex flex-col space-y-2 p-6"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navigationOptions.map((option) => (
              <NavigationItem
                key={option.title}
                option={option}
                isActive={activeOption.title === option.title}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          {/* Language switcher in mobile menu */}
          <div className="border-t border-white/10 p-6">
            <div className="mb-3 text-sm font-medium text-white/70">Language</div>
            <LanguageSwitcher className="w-full" />
          </div>
        </div>
      )}
    </>
  );
};
