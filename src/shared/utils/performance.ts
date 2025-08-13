// Utility functions extracted from worker for unit testing.
// Keep constants mirrored; if updated in worker, reflect here or refactor worker to import.

export const EASING_THRESHOLD = 0.5;
export const EASING_IN_COEFF = 4;
export const EASING_OUT_BASE = 2;
export const EASING_OUT_EXP = 3;
export const PERF_FCP_LIMIT = 1800;
export const PERF_LCP_LIMIT = 2500;
export const PERF_DCL_LIMIT = 1500;
export const SLOW_RESOURCE_LIMIT = 1000;

export function easeInOutCubic(t: number) {
  return t < EASING_THRESHOLD
    ? EASING_IN_COEFF * t * t * t
    : 1 - Math.pow(-EASING_OUT_BASE * t + EASING_OUT_BASE, EASING_OUT_EXP) / 2;
}

export interface SimplePerfInput {
  fcp: number; // first contentful paint ms
  lcp: number; // largest contentful paint ms
  domContentLoaded: number; // DOMContentLoaded delta ms
  slowResources: number; // count of slow resources over threshold
}

export function computePerformanceScore({
  fcp,
  lcp,
  domContentLoaded,
  slowResources,
}: SimplePerfInput) {
  let score = 100;
  if (fcp > PERF_FCP_LIMIT) score -= 20;
  if (lcp > PERF_LCP_LIMIT) score -= 25;
  if (domContentLoaded > PERF_DCL_LIMIT) score -= 15;
  if (slowResources > 0) score -= slowResources * 5;
  return Math.max(0, score);
}

// Helper to classify score bands (optional extra value for UI)
export function classifyScore(score: number): "excellent" | "good" | "fair" | "poor" {
  if (score >= 90) return "excellent";
  if (score >= 75) return "good";
  if (score >= 50) return "fair";
  return "poor";
}
