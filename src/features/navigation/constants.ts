/**
 * Navigation Constants
 */

import type { NavigationItem } from "./types";

const NAV_SECTIONS = ["home", "projects", "about", "contact"] as const;

export const NAVIGATION_ITEMS: readonly NavigationItem[] = NAV_SECTIONS.map((section) => ({
  title: section.charAt(0).toUpperCase() + section.slice(1),
  href: `#${section}`,
  id: section,
}));

/**
 * Navigation scroll behavior constants
 */
// Offset for smooth scrolling to account for fixed header and padding
export const SCROLL_OFFSET = 150;
// Height of the fixed header for scroll position calculations
export const HEADER_OFFSET = 100;
// Distance from bottom of page to trigger last section as active
export const BOTTOM_THRESHOLD = 10;
