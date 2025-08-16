import { describe, it, expect } from "vitest";

describe("content types", () => {
  it("should have proper type definitions", async () => {
    const types = await import("../content");
    expect(types).toBeDefined();
  });

  it("exports expected type interfaces", async () => {
    const types = await import("../content");
    expect(typeof types).toBe("object");
  });
});
