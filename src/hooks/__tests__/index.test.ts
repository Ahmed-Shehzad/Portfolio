import { describe, it, expect } from "vitest";
import * as HookExports from "../index";

describe("Hooks index", () => {
  it("exports all hooks", () => {
    expect(HookExports.useBfcacheCompatible).toBeDefined();
    expect(HookExports.useScrollAnimation).toBeDefined();
    expect(HookExports.useWebWorker).toBeDefined();
  });

  it("exports are functions", () => {
    expect(typeof HookExports.useBfcacheCompatible).toBe("function");
    expect(typeof HookExports.useScrollAnimation).toBe("function");
    expect(typeof HookExports.useWebWorker).toBe("function");
  });
});
