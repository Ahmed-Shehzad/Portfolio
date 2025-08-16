import { describe, it, expect } from "vitest";
import {
  easeInOutCubic,
  computePerformanceScore,
  classifyScore,
  PERF_FCP_LIMIT,
  PERF_LCP_LIMIT,
  PERF_DCL_LIMIT,
} from "../performance";

describe("performance utilities", () => {
  describe("easeInOutCubic", () => {
    it("returns correct values for key points", () => {
      expect(easeInOutCubic(0)).toBe(0);
      expect(easeInOutCubic(1)).toBe(1);
      expect(easeInOutCubic(0.5)).toBe(0.5);
    });

    it("handles values below threshold", () => {
      const result = easeInOutCubic(0.25);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(0.5);
    });

    it("handles values above threshold", () => {
      const result = easeInOutCubic(0.75);
      expect(result).toBeGreaterThan(0.5);
      expect(result).toBeLessThan(1);
    });
  });

  describe("computePerformanceScore", () => {
    it("returns perfect score for good metrics", () => {
      const score = computePerformanceScore({
        fcp: 1000,
        lcp: 2000,
        domContentLoaded: 1000,
        slowResources: 0,
      });
      expect(score).toBe(100);
    });

    it("penalizes poor FCP", () => {
      const score = computePerformanceScore({
        fcp: PERF_FCP_LIMIT + 100,
        lcp: 2000,
        domContentLoaded: 1000,
        slowResources: 0,
      });
      expect(score).toBe(80);
    });

    it("penalizes poor LCP", () => {
      const score = computePerformanceScore({
        fcp: 1000,
        lcp: PERF_LCP_LIMIT + 100,
        domContentLoaded: 1000,
        slowResources: 0,
      });
      expect(score).toBe(75);
    });

    it("penalizes slow DOM content loaded", () => {
      const score = computePerformanceScore({
        fcp: 1000,
        lcp: 2000,
        domContentLoaded: PERF_DCL_LIMIT + 100,
        slowResources: 0,
      });
      expect(score).toBe(85);
    });

    it("penalizes slow resources", () => {
      const score = computePerformanceScore({
        fcp: 1000,
        lcp: 2000,
        domContentLoaded: 1000,
        slowResources: 2,
      });
      expect(score).toBe(90);
    });

    it("never returns negative scores", () => {
      const score = computePerformanceScore({
        fcp: 5000,
        lcp: 5000,
        domContentLoaded: 5000,
        slowResources: 50,
      });
      expect(score).toBe(0);
    });
  });

  describe("classifyScore", () => {
    it("classifies excellent scores", () => {
      expect(classifyScore(95)).toBe("excellent");
      expect(classifyScore(90)).toBe("excellent");
    });

    it("classifies good scores", () => {
      expect(classifyScore(85)).toBe("good");
      expect(classifyScore(75)).toBe("good");
    });

    it("classifies fair scores", () => {
      expect(classifyScore(65)).toBe("fair");
      expect(classifyScore(50)).toBe("fair");
    });

    it("classifies poor scores", () => {
      expect(classifyScore(40)).toBe("poor");
      expect(classifyScore(0)).toBe("poor");
    });
  });
});
