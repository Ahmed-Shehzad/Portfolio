import { describe, it, expect } from "vitest";
import { HOBBIES } from "../personal";

describe("personal constants", () => {
  describe("HOBBIES", () => {
    it("is an array with items", () => {
      expect(Array.isArray(HOBBIES)).toBe(true);
      expect(HOBBIES.length).toBeGreaterThan(0);
    });

    it("has correct structure for each hobby", () => {
      HOBBIES.forEach((hobby) => {
        expect(hobby).toHaveProperty("title");
        expect(hobby).toHaveProperty("emoji");
        expect(typeof hobby.title).toBe("string");
        expect(typeof hobby.emoji).toBe("string");
        expect(hobby.title.length).toBeGreaterThan(0);
        expect(hobby.emoji.length).toBeGreaterThan(0);
      });
    });

    it("contains expected hobbies", () => {
      const titles = HOBBIES.map((h) => h.title);
      expect(titles).toContain("Reading");
      expect(titles).toContain("AI Pair Programming");
      expect(titles).toContain("Gaming");
    });

    it("has unique titles", () => {
      const titles = HOBBIES.map((h) => h.title);
      const uniqueTitles = [...new Set(titles)];
      expect(titles).toHaveLength(uniqueTitles.length);
    });

    it("has valid emojis", () => {
      HOBBIES.forEach((hobby) => {
        expect(hobby.emoji.length).toBeGreaterThan(0);
        // Just check that it's a non-empty string since emoji regex is complex
        expect(typeof hobby.emoji).toBe("string");
      });
    });
  });
});
