/**
 * Performance Constants
 */

export const PERFORMANCE_THRESHOLDS = {
  FCP: 1800,
  LCP: 2500,
  FID: 100,
  CLS: 0.1,
  TTFB: 600,
} as const;

export const METRICS_CONFIG = {
  enabled: true,
  sampleRate: 0.1,
  reportingInterval: 30000,
} as const;
