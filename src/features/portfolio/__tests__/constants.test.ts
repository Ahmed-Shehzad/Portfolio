import { describe, it, expect } from "vitest";
import { PORTFOLIO_PROJECTS } from "../constants";

describe("portfolio constants", () => {
  describe("PORTFOLIO_PROJECTS", () => {
    it("is an array with projects", () => {
      expect(Array.isArray(PORTFOLIO_PROJECTS)).toBe(true);
      expect(PORTFOLIO_PROJECTS.length).toBeGreaterThan(0);
    });

    it("has correct structure for each project", () => {
      PORTFOLIO_PROJECTS.forEach((project) => {
        expect(project).toHaveProperty("company");
        expect(project).toHaveProperty("year");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("results");
        expect(project).toHaveProperty("link");
        expect(project).toHaveProperty("image");
        expect(project).toHaveProperty("imageWidth");
        expect(project).toHaveProperty("imageHeight");

        expect(typeof project.company).toBe("string");
        expect(typeof project.year).toBe("string");
        expect(typeof project.title).toBe("string");
        expect(typeof project.link).toBe("string");
        expect(Array.isArray(project.results)).toBe(true);
        expect(typeof project.imageWidth).toBe("number");
        expect(typeof project.imageHeight).toBe("number");
      });
    });

    it("has valid URLs for all projects", () => {
      PORTFOLIO_PROJECTS.forEach((project) => {
        expect(() => new URL(project.link)).not.toThrow();
        expect(project.link).toMatch(/^https?:\/\//);
      });
    });

    it("has results for each project", () => {
      PORTFOLIO_PROJECTS.forEach((project) => {
        expect(project.results.length).toBeGreaterThan(0);
        project.results.forEach((result) => {
          expect(result).toHaveProperty("title");
          expect(typeof result.title).toBe("string");
          expect(result.title.length).toBeGreaterThan(0);
        });
      });
    });

    it("contains expected companies", () => {
      const companies = PORTFOLIO_PROJECTS.map((p) => p.company);
      expect(companies).toContain("Verbund Pflegehilfe");
      expect(companies).toContain("Sustayn GmbH");
      expect(companies).toContain("365Scores");
    });

    it("has valid image dimensions", () => {
      PORTFOLIO_PROJECTS.forEach((project) => {
        expect(project.imageWidth).toBeGreaterThan(0);
        expect(project.imageHeight).toBeGreaterThan(0);
      });
    });
  });
});
