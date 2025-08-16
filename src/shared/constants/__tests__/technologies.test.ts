import { describe, it, expect } from "vitest";
import { TOOLBOX_ITEMS } from "../technologies";

describe("technologies constants", () => {
  describe("TOOLBOX_ITEMS", () => {
    it("is an array with items", () => {
      expect(Array.isArray(TOOLBOX_ITEMS)).toBe(true);
      expect(TOOLBOX_ITEMS.length).toBeGreaterThan(0);
    });

    it("has correct structure for each item", () => {
      TOOLBOX_ITEMS.forEach((item) => {
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("iconType");
        expect(typeof item.title).toBe("string");
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.iconType).toBeDefined();
      });
    });

    it("contains expected technologies", () => {
      const titles = TOOLBOX_ITEMS.map((item) => item.title);
      expect(titles).toContain("C#");
      expect(titles).toContain(".NET");
      expect(titles).toContain("TypeScript");
      expect(titles).toContain("React");
      expect(titles).toContain("Docker");
    });

    it("has unique titles", () => {
      const titles = TOOLBOX_ITEMS.map((item) => item.title);
      const uniqueTitles = [...new Set(titles)];
      expect(titles).toHaveLength(uniqueTitles.length);
    });

    it("includes backend and frontend technologies", () => {
      const titles = TOOLBOX_ITEMS.map((item) => item.title);
      // Backend
      expect(titles).toContain("C#");
      expect(titles).toContain(".NET");
      expect(titles).toContain("PostgreSQL");
      // Frontend
      expect(titles).toContain("React");
      expect(titles).toContain("TypeScript");
      expect(titles).toContain("Tailwind CSS");
    });
  });
});
