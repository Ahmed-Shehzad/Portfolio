import { describe, it, expect, vi } from "vitest";

// Mock environment variables
vi.stubEnv("NODE_ENV", "test");
vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://test.example.com");

describe("env config", () => {
  it("reads environment variables", async () => {
    const { env } = await import("../env");

    expect(env.NODE_ENV).toBe("test");
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://test.example.com");
  });

  it("provides default values", async () => {
    const { env } = await import("../env");

    expect(env.isDevelopment).toBe(false);
    expect(env.isProduction).toBe(false);
    expect(env.isTest).toBe(true);
  });
});
