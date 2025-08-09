"use client";

import { useBfcacheCompatibleScrollListener } from "@/hooks/useBfcacheCompatible";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

interface HeaderOption {
  title: string;
  href: string;
  id: string; // Pre-computed id
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

const headerOptions: HeaderOption[] = [
  {
    title: "Home",
    href: "#home",
    id: "home",
  },
  {
    title: "Projects",
    href: "#projects",
    id: "projects",
  },
  {
    title: "About",
    href: "#about",
    id: "about",
  },
  {
    title: "Contact",
    href: "#contact",
    id: "contact",
  },
];

/**
 * NavigationItem – individual nav pill. Applies active styling and
 * smooth-scroll behavior via parent click handler.
 */
const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { option, isActive, onClick } = props;
  const className = `nav-item ${
    isActive ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900" : ""
  }`;

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
  const [activeOption, setActiveOption] = useState<HeaderOption>(headerOptions[0]);
  const [sectionElements, setSectionElements] = useState<SectionElement[]>([]);

  // Initialize section elements after component mounts (client-side only)
  useEffect(() => {
    const elements = headerOptions
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
  }, []);

  // Memoize contact section for bottom detection
  const contactSection = useMemo(() => headerOptions.find((option) => option.id === "contact"), []);

  // Optimized URL update function
  const updateURL = useCallback((section: HeaderOption) => {
    if (typeof window === "undefined") return; // SSR check

    const currentHash = window.location.hash;
    if (currentHash !== section.href) {
      const newUrl = `${window.location.pathname}${section.href}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  // Optimized active section detection
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined" || sectionElements.length === 0) return; // SSR check

    let currentSection = headerOptions[0];
    const scrollPosition = window.scrollY + SCROLL_OFFSET;

    // Check if at bottom of page
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - BOTTOM_THRESHOLD;

    if (isAtBottom && contactSection) {
      currentSection = contactSection;
    } else {
      // Find active section using cached offsetTop values
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (scrollPosition >= section.offsetTop) {
          const matchingOption = headerOptions.find((option) => option.id === section.id);
          if (matchingOption) {
            currentSection = matchingOption;
            break;
          }
        }
      }
    }

    updateURL(currentSection);
    setActiveOption(currentSection);
  }, [sectionElements, contactSection, updateURL]);

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

      if (typeof window === "undefined") return; // SSR check

      const element = document.getElementById(option.id);
      if (element) {
        const scrollToPosition = element.offsetTop - HEADER_OFFSET;
        window.scrollTo({
          top: Math.max(0, scrollToPosition),
          behavior: "smooth",
        });
      }
    },
    [updateURL]
  );

  return (
    <header
      className="fixed top-0 z-10 w-full border-b border-white/10 bg-black/10 backdrop-blur-sm"
      role="banner"
    >
      <div className="flex w-full items-center justify-center px-4 pt-8 pb-4 md:px-24">
        <nav
          className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-0.5 backdrop-blur"
          role="navigation"
          aria-label="Main navigation"
        >
          {headerOptions.map((option) => (
            <NavigationItem
              key={option.title}
              option={option}
              isActive={activeOption.title === option.title}
              onClick={handleNavClick}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};
