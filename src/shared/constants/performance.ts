/**
 * Performance Constants
 *
 * Centralized performance-related constants to eliminate duplication
 * and ensure consistency across the application.
 */

export const PERFORMANCE_CONSTANTS = {
  // Easing and Animation
  EASING_THRESHOLD: 0.5,
  EASING_IN_COEFF: 4,
  EASING_OUT_BASE: 2,
  EASING_OUT_EXP: 3,

  // Core Web Vitals Limits
  PERF_FCP_LIMIT: 1800, // First Contentful Paint (ms)
  PERF_LCP_LIMIT: 2500, // Largest Contentful Paint (ms)
  PERF_DCL_LIMIT: 1500, // DOM Content Loaded (ms)

  // Resource Performance
  SLOW_RESOURCE_LIMIT: 1000, // Slow resource threshold (ms)

  // UI Performance
  DEFAULT_VISIBILITY_THRESHOLD: 0.1,
  SCROLL_OFFSET: 150,
  HEADER_OFFSET: 100,
  BOTTOM_THRESHOLD: 10,

  // Worker Performance
  HEALTH_CHECK_INTERVAL_MS: 30000, // 30 seconds

  // Image Optimization
  IMAGE_OPTIMIZED_SIZES: [
    { width: 320, quality: 85 },
    { width: 640, quality: 85 },
    { width: 768, quality: 80 },
    { width: 1024, quality: 80 },
    { width: 1280, quality: 80 },
    { width: 1920, quality: 75 },
  ],

  // Animation Timing
  ANIMATION_DURATION_MS: 300,
  TRANSITION_DURATION: 200,

  // Performance Monitoring
  READING_WPM: 200, // Average reading speed
  STAR_DISPLAY_COUNT: 5,
} as const;

// Type for accessing constants
export type PerformanceConstant = keyof typeof PERFORMANCE_CONSTANTS;
