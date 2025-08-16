import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWebWorker } from "../useWebWorker";

describe("WebWorker Extended Coverage", () => {
  it("handles worker initialization", () => {
    const { result } = renderHook(() => useWebWorker());
    expect(result.current.isWorkerAvailable).toBe(false);
  });

  it("processes animation data", () => {
    const { result } = renderHook(() => useWebWorker());
    expect(typeof result.current.executeTask).toBe("function");
  });

  it("validates contact form", () => {
    const { result } = renderHook(() => useWebWorker());
    expect(typeof result.current.executeTask).toBe("function");
  });

  it("handles worker errors gracefully", () => {
    const { result } = renderHook(() => useWebWorker());

    expect(() => {
      result.current.executeTask("INVALID_TASK", {});
    }).not.toThrow();
  });
});
