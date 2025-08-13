import { describe, it, expect } from "vitest";
import {
  easeInOutCubic,
  computePerformanceScore,
  classifyScore,
  EASING_THRESHOLD,
  PERF_FCP_LIMIT,
  PERF_LCP_LIMIT,
  PERF_DCL_LIMIT,
} from "../performance";

// Easing tests ensure continuity, boundary correctness, and monotonic progression.
describe("easeInOutCubic", () => {
  it("returns 0 at t=0", () => {
    expect(easeInOutCubic(0)).toBeCloseTo(0, 6);
  });
  it("returns 1 at t=1", () => {
    expect(easeInOutCubic(1)).toBeCloseTo(1, 6);
  });
  it("is symmetric around 0.5", () => {
    const left = easeInOutCubic(EASING_THRESHOLD - 0.1);
    const right = 1 - easeInOutCubic(EASING_THRESHOLD + 0.1);
    expect(Math.abs(left - right)).toBeLessThan(1e-6);
  });
  it("monotonically increases in 0..1", () => {
    let prev = -Infinity;
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const v = easeInOutCubic(t);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe("computePerformanceScore", () => {
  it("keeps perfect score when all metrics are good", () => {
    const score = computePerformanceScore({
      fcp: 500,
      lcp: 800,
      domContentLoaded: 900,
      slowResources: 0,
    });
    expect(score).toBe(100);
  });
  it("deducts for exceeding FCP limit", () => {
    const score = computePerformanceScore({
      fcp: PERF_FCP_LIMIT + 1,
      lcp: 0,
      domContentLoaded: 0,
      slowResources: 0,
    });
    expect(score).toBe(80);
  });
  it("deducts cumulatively for multiple overruns", () => {
    const score = computePerformanceScore({
      fcp: PERF_FCP_LIMIT + 10,
      lcp: PERF_LCP_LIMIT + 10,
      domContentLoaded: PERF_DCL_LIMIT + 10,
      slowResources: 2,
    });
    // 100 -20 -25 -15 - (2*5) = 30
    expect(score).toBe(30);
  });
  it("floors score at 0", () => {
    const score = computePerformanceScore({
      fcp: PERF_FCP_LIMIT * 10,
      lcp: PERF_LCP_LIMIT * 10,
      domContentLoaded: PERF_DCL_LIMIT * 10,
      slowResources: 50,
    });
    expect(score).toBe(0);
  });
});

describe("classifyScore", () => {
  it("classifies excellent (>=90)", () => {
    expect(classifyScore(95)).toBe("excellent");
  });
  it("classifies good (>=75)", () => {
    expect(classifyScore(80)).toBe("good");
  });
  it("classifies fair (>=50)", () => {
    expect(classifyScore(60)).toBe("fair");
  });
  it("classifies poor (<50)", () => {
    expect(classifyScore(10)).toBe("poor");
  });
});
