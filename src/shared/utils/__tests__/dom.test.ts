import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isBrowser, scrollToElement, getScrollPosition, prefersReducedMotion } from "../dom";

describe("dom utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("isBrowser", () => {
    it("returns true when window is defined", () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe("scrollToElement", () => {
    it("does nothing when not in browser", () => {
      const originalWindow = global.window;
      // @ts-expect-error testing undefined window
      delete global.window;

      expect(() => scrollToElement("test")).not.toThrow();

      global.window = originalWindow;
    });

    it("scrolls to element when found", () => {
      const mockElement = {
        getBoundingClientRect: vi.fn(() => ({ top: 100 })),
      };
      const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
      vi.spyOn(document, "getElementById").mockReturnValue(mockElement as any);

      Object.defineProperty(window, "pageYOffset", { value: 50, writable: true });

      scrollToElement("test", 20);

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 130, // 100 + 50 - 20
        behavior: "smooth",
      });
    });

    it("handles element not found", () => {
      vi.spyOn(document, "getElementById").mockReturnValue(null);
      const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

      scrollToElement("nonexistent");

      expect(scrollToSpy).not.toHaveBeenCalled();
    });
  });

  describe("getScrollPosition", () => {
    it("returns current scroll position", () => {
      Object.defineProperty(window, "pageXOffset", { value: 100, writable: true });
      Object.defineProperty(window, "pageYOffset", { value: 200, writable: true });

      const position = getScrollPosition();

      expect(position).toEqual({ x: 100, y: 200 });
    });

    it("returns zero when not in browser", () => {
      const originalWindow = global.window;
      // @ts-expect-error - testing undefined window
      delete global.window;

      const position = getScrollPosition();

      expect(position).toEqual({ x: 0, y: 0 });

      global.window = originalWindow;
    });
  });

  describe("prefersReducedMotion", () => {
    it("returns false when not in browser", () => {
      const originalWindow = global.window;
      // @ts-expect-error - testing undefined window
      delete global.window;

      const result = prefersReducedMotion();

      expect(result).toBe(false);

      global.window = originalWindow;
    });

    it("returns matchMedia result", () => {
      const mockMatchMedia = vi.fn(() => ({ matches: true }));
      Object.defineProperty(window, "matchMedia", { value: mockMatchMedia });

      const result = prefersReducedMotion();

      expect(result).toBe(true);
      expect(mockMatchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    });
  });
});
