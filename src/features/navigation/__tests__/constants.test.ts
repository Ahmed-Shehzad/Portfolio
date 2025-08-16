import { describe, it, expect } from "vitest";
import { NAVIGATION_ITEMS, SCROLL_OFFSET } from "../constants";

describe("navigation constants", () => {
  it("exports navigation items", () => {
    expect(NAVIGATION_ITEMS).toBeDefined();
    expect(Array.isArray(NAVIGATION_ITEMS)).toBe(true);
    expect(NAVIGATION_ITEMS.length).toBeGreaterThan(0);
  });

  it("has valid navigation item structure", () => {
    NAVIGATION_ITEMS.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("href");
      expect(typeof item.id).toBe("string");
      expect(typeof item.title).toBe("string");
    });
  });

  it("exports scroll configuration", () => {
    expect(SCROLL_OFFSET).toBeDefined();
    expect(typeof SCROLL_OFFSET).toBe("number");
  });
});
