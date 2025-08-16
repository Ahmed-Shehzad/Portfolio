/**
 * Animation Constants
 */

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

export const ANIMATION_EASINGS = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

export const SCROLL_THRESHOLDS = {
  trigger: 0.1,
  complete: 0.9,
  offset: 100,
} as const;
