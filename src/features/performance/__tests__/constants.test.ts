import { describe, it, expect } from "vitest";
import { PERFORMANCE_THRESHOLDS, METRICS_CONFIG } from "../constants";

describe("performance constants", () => {
  it("exports performance thresholds", () => {
    expect(PERFORMANCE_THRESHOLDS).toBeDefined();
    expect(typeof PERFORMANCE_THRESHOLDS).toBe("object");
    expect(PERFORMANCE_THRESHOLDS.FCP).toBeGreaterThan(0);
    expect(PERFORMANCE_THRESHOLDS.LCP).toBeGreaterThan(0);
  });

  it("exports metrics configuration", () => {
    expect(METRICS_CONFIG).toBeDefined();
    expect(typeof METRICS_CONFIG).toBe("object");
    expect(METRICS_CONFIG.enabled).toBeDefined();
  });

  it("has valid threshold values", () => {
    expect(PERFORMANCE_THRESHOLDS.FCP).toBeLessThan(PERFORMANCE_THRESHOLDS.LCP);
    expect(PERFORMANCE_THRESHOLDS.CLS).toBeLessThan(1);
  });
});
