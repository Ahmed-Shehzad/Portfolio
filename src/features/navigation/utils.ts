/**
 * Navigation Utilities
 *
 * Pure functions for navigation-related operations.
 */

import type { SectionElement } from "./types";
import { SCROLL_OFFSET, HEADER_OFFSET, BOTTOM_THRESHOLD } from "./constants";

/**
 * Gets all section elements for navigation
 */
export const getSectionElements = (): SectionElement[] => {
  const sections = document.querySelectorAll("section[id]");

  return Array.from(sections).map((section) => {
    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop;

    return {
      element: section,
      id: section.id,
      top: rect.top + scrollTop,
      height: rect.height,
    };
  });
};

/**
 * Determines the currently active section based on scroll position
 */
export const getActiveSectionId = (sections: SectionElement[]): string => {
  const scrollPosition = window.scrollY + HEADER_OFFSET;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if we're near the bottom of the page
  if (scrollPosition + windowHeight >= documentHeight - BOTTOM_THRESHOLD) {
    return sections[sections.length - 1]?.id ?? "";
  }

  // Find the section that's currently in view
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section && scrollPosition >= section.top - SCROLL_OFFSET) {
      return section.id;
    }
  }

  return sections[0]?.id ?? "";
};

/**
 * Smoothly scrolls to a section
 */
export const scrollToSection = (href: string): void => {
  const targetId = href.replace("#", "");
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const offsetTop = targetElement.offsetTop - HEADER_OFFSET;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};
