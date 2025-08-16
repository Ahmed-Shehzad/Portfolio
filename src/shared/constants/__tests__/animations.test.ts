import { describe, it, expect } from "vitest";
import { ANIMATION_DURATIONS, ANIMATION_EASINGS, SCROLL_THRESHOLDS } from "../animations";

describe("animation constants", () => {
  it("exports animation durations", () => {
    expect(ANIMATION_DURATIONS).toBeDefined();
    expect(typeof ANIMATION_DURATIONS).toBe("object");
    expect(ANIMATION_DURATIONS.fast).toBeGreaterThan(0);
  });

  it("exports animation easings", () => {
    expect(ANIMATION_EASINGS).toBeDefined();
    expect(typeof ANIMATION_EASINGS).toBe("object");
    expect(typeof ANIMATION_EASINGS.easeInOut).toBe("string");
  });

  it("exports scroll thresholds", () => {
    expect(SCROLL_THRESHOLDS).toBeDefined();
    expect(typeof SCROLL_THRESHOLDS).toBe("object");
    expect(SCROLL_THRESHOLDS.trigger).toBeGreaterThan(0);
  });
});
