/**
 * Navigation Hook
 *
 * Custom hook for managing navigation state and behavior.
 */

import { useCallback, useEffect, useState } from "react";
import { useBfcacheCompatibleScrollListener } from "@/hooks/useBfcacheCompatible";

import { getSectionElements, getActiveSectionId, scrollToSection } from "../utils";

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  /**
   * Updates active section based on current scroll position
   */
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined") return;
    const sections = getSectionElements();
    const newActiveSection = getActiveSectionId(sections);
    setActiveSection(newActiveSection);
  }, []);

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
