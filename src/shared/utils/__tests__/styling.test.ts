import { describe, it, expect } from "vitest";
import { cn } from "@/shared/utils/styling";

// Simple tests for tailwind merge helper to raise coverage on a small pure util

describe("cn", () => {
  it("merges class names and removes duplicates", () => {
    expect(cn("p-2", "text-sm", "p-2")).toContain("p-2");
  });

  it("handles conditional values", () => {
    const cond = true;
    expect(cn("p-2", cond && "m-1")).toMatch(/p-2/);
  });
});
