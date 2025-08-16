import { describe, it, expect, vi } from "vitest";
import { defaultQueryOptions, createQueryClient, queryKeys, queryKeyUtils } from "../config";

vi.mock("@/config", () => ({
  ENV_CONFIG: {
    isProduction: false,
    isDevelopment: true,
  },
}));

describe("query config", () => {
  describe("defaultQueryOptions", () => {
    it("has correct stale time", () => {
      expect(defaultQueryOptions.queries.staleTime).toBe(5 * 60 * 1000);
    });

    it("has correct gc time", () => {
      expect(defaultQueryOptions.queries.gcTime).toBe(10 * 60 * 1000);
    });

    it("has retry function", () => {
      expect(typeof defaultQueryOptions.queries.retry).toBe("function");
    });

    it("retry function handles 4xx errors", () => {
      const retryFn = defaultQueryOptions.queries.retry;
      const result = retryFn(1, { status: 404 });
      expect(result).toBe(false);
    });

    it("retry function allows retries for 5xx errors", () => {
      const retryFn = defaultQueryOptions.queries.retry;
      const result = retryFn(1, { status: 500 });
      expect(result).toBe(true);
    });

    it("has retry delay function", () => {
      expect(typeof defaultQueryOptions.queries.retryDelay).toBe("function");
    });

    it("retry delay increases exponentially", () => {
      const retryDelayFn = defaultQueryOptions.queries.retryDelay;
      expect(retryDelayFn(0)).toBe(1000);
      expect(retryDelayFn(1)).toBe(2000);
      expect(retryDelayFn(2)).toBe(4000);
    });
  });

  describe("createQueryClient", () => {
    it("creates a QueryClient instance", () => {
      const client = createQueryClient();
      expect(client).toBeDefined();
    });
  });

  describe("queryKeys", () => {
    it("has base keys", () => {
      expect(queryKeys.all).toEqual(["app"]);
    });

    it("generates contact keys", () => {
      expect(queryKeys.contact()).toEqual(["app", "contact"]);
    });

    it("generates project keys", () => {
      expect(queryKeys.projects()).toEqual(["app", "projects"]);
      expect(queryKeys.projectDetail("123")).toEqual(["app", "projects", "detail", "123"]);
    });

    it("generates user keys", () => {
      expect(queryKeys.user()).toEqual(["app", "user"]);
      expect(queryKeys.userProfile("456")).toEqual(["app", "user", "profile", "456"]);
    });
  });

  describe("queryKeyUtils", () => {
    it("has utility functions", () => {
      expect(typeof queryKeyUtils.invalidatePattern).toBe("function");
      expect(typeof queryKeyUtils.removePattern).toBe("function");
      expect(typeof queryKeyUtils.prefetch).toBe("function");
    });
  });
});
