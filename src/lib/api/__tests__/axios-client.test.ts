import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiError, api } from "../axios-client";

vi.mock("@/config", () => ({
  ENV_CONFIG: {
    isDevelopment: false,
    api: {
      baseUrl: "http://localhost:3000/api",
      timeout: 10000,
    },
  },
}));

vi.mock("@/shared/utils/logging", () => ({
  secureLog: {
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

describe("axios-client", () => {
  describe("ApiError", () => {
    it("creates error with message", () => {
      const error = new ApiError("Test error", 404, "NOT_FOUND");
      expect(error.message).toBe("Test error");
      expect(error.status).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
      expect(error.name).toBe("ApiError");
    });

    it("creates error from axios error", () => {
      const axiosError = {
        message: "Network Error",
        response: {
          status: 500,
          data: { message: "Server Error" },
        },
        code: "NETWORK_ERROR",
      };

      const apiError = ApiError.fromAxiosError(axiosError as any);
      expect(apiError.message).toBe("Server Error");
      expect(apiError.status).toBe(500);
      expect(apiError.code).toBe("NETWORK_ERROR");
    });

    it("handles axios error without response", () => {
      const axiosError = {
        message: "Network Error",
        code: "NETWORK_ERROR",
      };

      const apiError = ApiError.fromAxiosError(axiosError as any);
      expect(apiError.message).toBe("Network Error");
      expect(apiError.status).toBeUndefined();
    });
  });

  describe("api methods", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("has all HTTP methods", () => {
      expect(typeof api.get).toBe("function");
      expect(typeof api.post).toBe("function");
      expect(typeof api.put).toBe("function");
      expect(typeof api.patch).toBe("function");
      expect(typeof api.delete).toBe("function");
    });
  });
});
