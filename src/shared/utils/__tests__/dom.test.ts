import { describe, it, expect, vi } from "vitest";
import {
  isBrowser,
  getScrollPosition,
  prefersReducedMotion,
  scrollToElement,
} from "@/shared/utils/dom";

// jsdom provides a window, so isBrowser should be true in tests

describe("dom utils", () => {
  it("isBrowser returns true under jsdom", () => {
    expect(isBrowser()).toBe(true);
  });

  it("getScrollPosition returns coordinates", () => {
    const pos = getScrollPosition();
    expect(pos).toHaveProperty("x");
    expect(pos).toHaveProperty("y");
  });

  it("prefersReducedMotion evaluates media query", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(prefersReducedMotion()).toBe(true);
    window.matchMedia = original;
  });

  it("scrollToElement does not throw if element missing", () => {
    scrollToElement("missing-id");
  });
});
