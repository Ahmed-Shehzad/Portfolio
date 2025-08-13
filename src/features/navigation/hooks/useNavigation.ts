/**
 * Navigation Hook
 *
 * Custom hook for managing navigation state and behavior.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useBfcacheCompatibleScrollListener } from "@/hooks/useBfcacheCompatible";
import type { SectionElement } from "../types";
import { getSectionElements, getActiveSectionId, scrollToSection } from "../utils";

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Memoize section elements to avoid recalculating on every scroll
  const sections = useMemo<SectionElement[]>(() => {
    if (typeof window === "undefined") return [];
    return getSectionElements();
  }, []);

  /**
   * Updates active section based on current scroll position
   */
  const updateActiveSection = useCallback(() => {
    const newActiveSection = getActiveSectionId(sections);
    setActiveSection(newActiveSection);
  }, [sections]);

  /**
   * Handles navigation item click
   */
  const handleNavigationClick = useCallback((href: string, id: string) => {
    scrollToSection(href);
    setActiveSection(id);
  }, []);

  // Set up scroll listener using the bfcache-compatible hook
  useBfcacheCompatibleScrollListener(updateActiveSection);

  // Initialize active section on mount
  useEffect(() => {
    updateActiveSection();
  }, [updateActiveSection]);

  return {
    activeSection,
    handleNavigationClick,
  };
};
