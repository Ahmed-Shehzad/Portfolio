import { describe, it, expect } from "vitest";
import * as UIExports from "../index";

describe("UI Components index", () => {
  it("exports all UI components", () => {
    expect(UIExports.Card).toBeDefined();
    expect(UIExports.CardHeader).toBeDefined();
    expect(UIExports.Modal).toBeDefined();
    expect(UIExports.OptimizedImage).toBeDefined();
    expect(UIExports.SectionHeader).toBeDefined();
    expect(UIExports.TechIcon).toBeDefined();
  });

  it("exports are functions/components", () => {
    expect(typeof UIExports.Card).toBe("function");
    expect(typeof UIExports.CardHeader).toBe("function");
    expect(typeof UIExports.Modal).toBe("function");
    expect(typeof UIExports.OptimizedImage).toBe("function");
    expect(typeof UIExports.SectionHeader).toBe("function");
    expect(typeof UIExports.TechIcon).toBe("function");
  });
});
