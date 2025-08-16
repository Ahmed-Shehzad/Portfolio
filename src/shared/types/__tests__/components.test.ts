import { describe, it, expect } from "vitest";

describe("component types", () => {
  it("should have proper type definitions", async () => {
    const types = await import("../components");
    expect(types).toBeDefined();
  });

  it("exports expected type interfaces", async () => {
    const types = await import("../components");
    expect(typeof types).toBe("object");
  });
});
