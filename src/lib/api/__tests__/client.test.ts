import { describe, it, expect } from "vitest";
import { createApiClient } from "../client";

describe("API client", () => {
  it("creates client with default config", () => {
    const client = createApiClient();
    expect(client).toBeDefined();
    expect(client.defaults.timeout).toBe(10000);
  });

  it("creates client with custom config", () => {
    const client = createApiClient({
      baseURL: "https://api.example.com",
      timeout: 5000,
    });
    expect(client.defaults.baseURL).toBe("https://api.example.com");
    expect(client.defaults.timeout).toBe(5000);
  });

  it("includes default headers", () => {
    const client = createApiClient();
    expect(client.defaults.headers["Content-Type"]).toBe("application/json");
  });
});
