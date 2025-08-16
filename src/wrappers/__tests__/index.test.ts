import { describe, it, expect } from "vitest";
import * as WrapperExports from "../index";

describe("Wrappers index", () => {
  it("exports all wrapper components", () => {
    expect(WrapperExports.ErrorBoundary).toBeDefined();
    expect(WrapperExports.ErrorBoundaryWrapper).toBeDefined();
    expect(WrapperExports.ScrollAnimationWrapper).toBeDefined();
  });

  it("exports are functions/components", () => {
    expect(typeof WrapperExports.ErrorBoundary).toBe("function");
    expect(typeof WrapperExports.ErrorBoundaryWrapper).toBe("function");
    expect(typeof WrapperExports.ScrollAnimationWrapper).toBe("object"); // React.memo returns object
  });
});
