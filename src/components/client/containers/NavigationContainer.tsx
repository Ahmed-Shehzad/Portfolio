"use client";

import { useBfcacheCompatibleScrollListener } from "@/hooks/useBfcacheCompatible";
import { useScreenSize } from "@/hooks/useScreenSize";
import { env } from "@/config/env";
import { logger } from "@/shared/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Navigation } from "../presentational/Navigation";

interface HeaderOption {
  title: string;
  href: string;
  id: string;
  isExternal?: boolean;
  showInNavigation?: boolean;
}

interface SectionElement {
  id: string;
  element: HTMLElement;
  offsetTop: number;
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
  { title: "Resume", href: "/resume", id: "resume", isExternal: true },
  {
    title: "Cover Letter",
    href: "/cover-letter",
    id: "cover-letter",
    isExternal: true,
    showInNavigation: env.isDevelopment,
  },
];

// Function to create locale-aware header options
const createHeaderOptions = (locale: string): HeaderOption[] => {
  return baseHeaderOptions.map((option) => ({
    ...option,
    href: option.isExternal ? `/${locale}${option.href}` : option.href,
  }));
};

// Default header option for fallback scenarios
const DEFAULT_HEADER_OPTION: HeaderOption = {
  title: "Home",
  href: "#home",
  id: "home",
};

/**
 * NavigationContainer
 *
 * Container component that handles all business logic for navigation.
 *
 * Responsibilities:
 * - Manage active section detection based on scroll position
 * - Handle smooth scrolling navigation
 * - Manage mobile menu state
 * - Track section elements and their positions
 * - Handle URL hash updates
 * - Provide locale-aware navigation options
 * - Manage scroll-based active section highlighting
 */
export const NavigationContainer = () => {
  const locale = useLocale();
  const { isMobile, isTablet } = useScreenSize();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine if we should show mobile UI
  const showMobileUI = isMobile || isTablet;

  // Create locale-aware header options
  const headerOptions = useMemo(() => createHeaderOptions(locale), [locale]);

  const [activeOption, setActiveOption] = useState<HeaderOption>(
    baseHeaderOptions[0] || DEFAULT_HEADER_OPTION
  );
  const [sectionElements, setSectionElements] = useState<SectionElement[]>([]);

  // Initialize section elements after component mounts
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateElements = () => {
      const elements = headerOptions
        .filter((option) => option.href.startsWith("#"))
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

  // Create lookup map for section id to HeaderOption mapping
  const optionsMap = useMemo(() => {
    const map = new Map<string, HeaderOption>();
    headerOptions
      .filter((option) => option.href.startsWith("#"))
      .forEach((option) => map.set(option.id, option));
    return map;
  }, [headerOptions]);

  // Helper function to handle bottom section detection
  const handleBottomSection = useCallback(() => {
    const lastSection = sectionElements[sectionElements.length - 1];
    if (lastSection) {
      const option = optionsMap.get(lastSection.id);
      if (option && option.id !== activeOption.id) {
        setActiveOption(option);
        window.history.replaceState(null, "", `#${lastSection.id}`);
      }
    }
  }, [sectionElements, optionsMap, activeOption.id]);

  // Helper function to find active section by scroll position
  const findActiveSectionId = useCallback(
    (scrollPosition: number): string => {
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && scrollPosition >= section.offsetTop - SCROLL_OFFSET) {
          return section.id;
        }
      }
      return "";
    },
    [sectionElements]
  );

  // Helper function to update active section
  const updateActiveSection = useCallback(
    (newActiveId: string) => {
      if (newActiveId && newActiveId !== activeOption.id) {
        const newOption = optionsMap.get(newActiveId);
        if (newOption) {
          setActiveOption(newOption);
          window.history.replaceState(null, "", `#${newActiveId}`);
        }
      }
    },
    [optionsMap, activeOption.id]
  );

  // Handle scroll-based active section detection
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || sectionElements.length === 0) return;

    try {
      const scrollPosition = window.scrollY + HEADER_OFFSET;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - BOTTOM_THRESHOLD;

      if (isNearBottom) {
        handleBottomSection();
        return;
      }

      // Find and update the active section
      const newActiveId = findActiveSectionId(scrollPosition);
      updateActiveSection(newActiveId);
    } catch (error) {
      logger.error("Error in scroll handler:", error as Error);
    }
  }, [sectionElements, handleBottomSection, findActiveSectionId, updateActiveSection]);

  // Set up scroll listener
  useBfcacheCompatibleScrollListener(handleScroll);

  // Handle navigation item click
  const handleNavigationClick = useCallback((option: HeaderOption) => {
    try {
      if (option.href.startsWith("#")) {
        // Smooth scroll to section
        const elementId = option.href.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          const offsetTop = element.offsetTop - HEADER_OFFSET;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          setActiveOption(option);
          window.history.replaceState(null, "", option.href);
        }
      }
    } catch (error) {
      logger.error("Error in navigation click:", error as Error);
    }
  }, []);

  // Handle mobile menu toggle
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <Navigation
      isMobileMenuOpen={isMobileMenuOpen}
      showMobileUI={showMobileUI}
      activeOption={activeOption}
      headerOptions={headerOptions}
      onMobileMenuToggle={handleMobileMenuToggle}
      onNavigationClick={handleNavigationClick}
    />
  );
};
