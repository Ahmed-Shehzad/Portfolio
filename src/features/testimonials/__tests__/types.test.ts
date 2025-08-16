import { describe, it, expect } from "vitest";

describe("testimonial types", () => {
  it("should have proper type definitions", async () => {
    const types = await import("../types");
    expect(types).toBeDefined();
  });

  it("exports expected type interfaces", async () => {
    const types = await import("../types");
    expect(typeof types).toBe("object");
  });
});
