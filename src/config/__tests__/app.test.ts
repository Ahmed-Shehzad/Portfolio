import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { APP_CONFIG, ENV_CONFIG } from "../app";

describe("app config", () => {
  describe("APP_CONFIG", () => {
    it("has correct application metadata", () => {
      expect(APP_CONFIG.name).toBe("Muhammad Ahmed Shehzad Portfolio");
      expect(APP_CONFIG.version).toBe("1.0.0");
      expect(APP_CONFIG.author).toBe("Muhammad Ahmed Shehzad");
    });

    it("has valid URLs", () => {
      Object.values(APP_CONFIG.urls).forEach((url) => {
        if (url.startsWith("http")) {
          expect(() => new URL(url)).not.toThrow();
        } else if (url.startsWith("mailto:")) {
          expect(url).toMatch(/^mailto:.+@.+\..+/);
        }
      });
    });

    it("has social media configuration", () => {
      expect(APP_CONFIG.social.github).toBe("Ahmed-Shehzad");
      expect(APP_CONFIG.social.linkedin).toBe("ahmed-shehzad");
      expect(APP_CONFIG.social.twitter).toBe("@ahmed_shehzad");
    });

    it("has feature flags", () => {
      expect(typeof APP_CONFIG.features.webWorkers).toBe("boolean");
      expect(typeof APP_CONFIG.features.analytics).toBe("boolean");
      expect(typeof APP_CONFIG.features.darkMode).toBe("boolean");
    });

    it("has performance settings", () => {
      expect(APP_CONFIG.performance.imageOptimization).toBe(true);
      expect(APP_CONFIG.performance.lazyLoading).toBe(true);
      expect(APP_CONFIG.performance.preloadCriticalAssets).toBe(true);
    });

    it("has SEO configuration", () => {
      expect(APP_CONFIG.seo.defaultTitle).toContain("Muhammad Ahmed Shehzad");
      expect(Array.isArray(APP_CONFIG.seo.keywords)).toBe(true);
      expect(APP_CONFIG.seo.keywords.length).toBeGreaterThan(0);
    });
  });

  describe("ENV_CONFIG", () => {
    let originalEnv: string | undefined;

    beforeEach(() => {
      originalEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
      if (originalEnv !== undefined) {
        process.env.NODE_ENV = originalEnv;
      }
    });

    it("has environment detection logic", () => {
      expect(typeof ENV_CONFIG.isTest).toBe("boolean");
      expect(typeof ENV_CONFIG.isDevelopment).toBe("boolean");
      expect(typeof ENV_CONFIG.isProduction).toBe("boolean");
    });

    it("has API configuration", () => {
      expect(typeof ENV_CONFIG.api.baseUrl).toBe("string");
      expect(ENV_CONFIG.api.timeout).toBe(10000);
    });

    it("has analytics configuration", () => {
      expect(ENV_CONFIG.analytics).toHaveProperty("googleAnalyticsId");
      expect(ENV_CONFIG.analytics).toHaveProperty("hotjarId");
    });
  });
});
