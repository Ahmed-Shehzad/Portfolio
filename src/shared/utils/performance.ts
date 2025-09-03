// Utility functions extracted from worker for unit testing.
import { PERFORMANCE_CONSTANTS } from "@/shared/constants/performance";

// Re-export constants for backward compatibility
export const {
  EASING_THRESHOLD,
  EASING_IN_COEFF,
  EASING_OUT_BASE,
  EASING_OUT_EXP,
  PERF_FCP_LIMIT,
  PERF_LCP_LIMIT,
  PERF_DCL_LIMIT,
  SLOW_RESOURCE_LIMIT,
} = PERFORMANCE_CONSTANTS;

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
