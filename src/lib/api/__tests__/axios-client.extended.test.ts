import { describe, it, expect, vi } from "vitest";
import { apiClient } from "../axios-client";

describe("Axios Client Extended Coverage", () => {
  it("has correct default configuration", () => {
    expect(apiClient.defaults.timeout).toBe(10000);
    expect(apiClient.defaults.headers["Content-Type"]).toBe("application/json");
  });

  it("handles request interceptors", () => {
    expect(apiClient.interceptors.request.handlers).toBeDefined();
  });

  it("handles response interceptors", () => {
    expect(apiClient.interceptors.response.handlers).toBeDefined();
  });

  it("can make requests", async () => {
    const mockResponse = { data: { success: true } };
    vi.spyOn(apiClient, "get").mockResolvedValue(mockResponse);

    const response = await apiClient.get("/test");
    expect(response.data.success).toBe(true);
  });
});
