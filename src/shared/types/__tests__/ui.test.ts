import { describe, it, expect } from "vitest";

describe("UI types", () => {
  it("should have proper type definitions", async () => {
    const types = await import("../ui");
    expect(types).toBeDefined();
  });

  it("exports expected type interfaces", async () => {
    const types = await import("../ui");
    expect(typeof types).toBe("object");
  });
});
