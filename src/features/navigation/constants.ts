/**
 * Navigation Constants
 */

import type { NavigationItem } from "./types";

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
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
] as const;

// Navigation scroll behavior constants
export const SCROLL_OFFSET = 150;
export const HEADER_OFFSET = 100;
export const BOTTOM_THRESHOLD = 10;
