// Animation constants
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const ANIMATION_EASING = {
  EASE_IN_OUT: "ease-in-out",
  EASE_IN: "ease-in",
  EASE_OUT: "ease-out",
  LINEAR: "linear",
} as const;

// Scroll animation options
export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
  rootMargin: "-10% 0px",
  triggerOnce: true,
} as const;
