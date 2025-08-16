import { describe, it, expect } from "vitest";
import { MAP_CONFIG } from "../config";

describe("config constants", () => {
  describe("MAP_CONFIG", () => {
    it("has correct center coordinates", () => {
      expect(MAP_CONFIG.CENTER).toEqual([50.0782, 8.2398]);
      expect(MAP_CONFIG.CENTER).toHaveLength(2);
    });

    it("has correct zoom level", () => {
      expect(MAP_CONFIG.ZOOM).toBe(13);
      expect(typeof MAP_CONFIG.ZOOM).toBe("number");
    });

    it("coordinates are valid latitude and longitude", () => {
      const [lat, lng] = MAP_CONFIG.CENTER;
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
    });
  });
});
