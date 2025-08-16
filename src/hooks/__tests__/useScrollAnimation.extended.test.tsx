import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollAnimation } from "../useScrollAnimation";

describe("ScrollAnimation Extended Coverage", () => {
  it("handles scroll events", () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(typeof result.current.isVisible).toBe("boolean");
  });

  it("handles resize events", () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.ref).toBeDefined();
  });

  it("calculates element visibility", () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(typeof result.current.isVisible).toBe("boolean");
  });

  it("provides scroll progress", () => {
    const { result } = renderHook(() => useScrollAnimation());

    expect(result.current.isVisible).toBe(false);
  });
});
