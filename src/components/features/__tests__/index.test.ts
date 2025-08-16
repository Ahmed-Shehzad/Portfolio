import { describe, it, expect } from "vitest";
import * as FeatureExports from "../index";

describe("Feature Components index", () => {
  it("exports all feature components", () => {
    expect(FeatureExports.ContactModal).toBeDefined();
    expect(FeatureExports.DynamicMap).toBeDefined();
    expect(FeatureExports.OpenStreetMap).toBeDefined();
    expect(FeatureExports.ToolboxItems).toBeDefined();
  });

  it("exports are functions/components", () => {
    expect(typeof FeatureExports.ContactModal).toBe("function");
    expect(typeof FeatureExports.DynamicMap).toBeDefined();
    expect(typeof FeatureExports.OpenStreetMap).toBe("function");
    expect(typeof FeatureExports.ToolboxItems).toBe("function");
  });
});
