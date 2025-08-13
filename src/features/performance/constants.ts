/**
 * Performance Feature Constants
 */

// Web Worker configuration
export const WORKER_TASK_TIMEOUT_MS = 30000; // 30 seconds timeout for tasks

// Performance thresholds (based on Core Web Vitals)
export const PERFORMANCE_THRESHOLDS = {
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
} as const;

// Worker task types
export const WORKER_TASKS = {
  PROCESS_ANIMATIONS: "PROCESS_ANIMATIONS",
  OPTIMIZE_IMAGES: "OPTIMIZE_IMAGES",
  CALCULATE_METRICS: "CALCULATE_METRICS",
} as const;
