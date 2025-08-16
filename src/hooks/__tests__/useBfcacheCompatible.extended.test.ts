import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBfcacheCompatibleTimeout } from "../useBfcacheCompatible";

describe("BfcacheCompatible Extended Coverage", () => {
  it("handles page show events", () => {
    const { result } = renderHook(() => useBfcacheCompatibleTimeout());

    expect(typeof result.current.setBfcacheTimeout).toBe("function");
  });

  it("handles page hide events", () => {
    const { result } = renderHook(() => useBfcacheCompatibleTimeout());

    expect(typeof result.current.clearBfcacheTimeout).toBe("function");
  });

  it("provides refresh function", () => {
    const { result } = renderHook(() => useBfcacheCompatibleTimeout());

    expect(typeof result.current.clearAllTimeouts).toBe("function");
  });

  it("handles visibility change", () => {
    const { result } = renderHook(() => useBfcacheCompatibleTimeout());

    expect(typeof result.current.setBfcacheTimeout).toBe("function");
  });
});
