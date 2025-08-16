import { describe, it, expect, vi } from "vitest";
import { scrollToSection, getActiveSectionId } from "../utils";

describe("navigation utils", () => {
  describe("scrollToSection", () => {
    it("scrolls to element when found", () => {
      const mockElement = {
        offsetTop: 100,
      };
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      window.scrollTo = vi.fn();

      scrollToSection("#test-id");

      expect(document.getElementById).toHaveBeenCalledWith("test-id");
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it("handles missing element gracefully", () => {
      document.getElementById = vi.fn().mockReturnValue(null);

      expect(() => scrollToSection("#missing")).not.toThrow();
    });
  });

  describe("getActiveSectionId", () => {
    it("returns active section based on scroll position", () => {
      const mockSections = [
        { id: "home", top: 0, height: 100, element: {} as Element },
        { id: "about", top: 100, height: 100, element: {} as Element },
      ];
      const result = getActiveSectionId(mockSections);
      expect(typeof result).toBe("string");
    });
  });
});
