/**
 * Navigation Feature Exports
 */

// Types
export type { NavigationItem, NavigationItemProps, HeaderProps, SectionElement } from "./types";

// Constants
export { NAVIGATION_ITEMS, SCROLL_OFFSET, HEADER_OFFSET, BOTTOM_THRESHOLD } from "./constants";

// Utils
export { getSectionElements, getActiveSectionId, scrollToSection } from "./utils";

// Hooks
export { useNavigation } from "./hooks/useNavigation";
