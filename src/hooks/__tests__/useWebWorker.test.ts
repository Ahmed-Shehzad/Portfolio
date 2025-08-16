import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWebWorker, useAnimationWorker, useContactValidationWorker } from "../useWebWorker";

// Mock Worker constructor to throw error (simulating no worker support)
global.Worker = vi.fn().mockImplementation(() => {
  throw new Error("Worker not supported in test environment");
});

describe("useWebWorker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with error when worker not available", () => {
    const { result } = renderHook(() => useWebWorker());

    expect(result.current.isWorkerAvailable).toBe(false);
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBe("Web Worker not supported in this environment");
  });

  it("throws error when executing task without worker", async () => {
    const { result } = renderHook(() => useWebWorker());

    await expect(result.current.executeTask("TEST_TASK", { input: "test" })).rejects.toThrow(
      "Web Worker not available"
    );
  });

  it("cleans up safely on unmount", () => {
    const { unmount } = renderHook(() => useWebWorker());

    // Should not throw when unmounting without worker
    expect(() => unmount()).not.toThrow();
  });
});

describe("useAnimationWorker", () => {
  it("falls back to original data when worker unavailable", async () => {
    const { result } = renderHook(() => useAnimationWorker());

    const elements = [
      {
        id: "test",
        element: document.createElement("div"),
        top: 100,
        height: 200,
      },
    ];
    const scrollProgress = 0.5;

    const processedElements = await result.current.processAnimations(elements, scrollProgress);

    // Should return original elements as fallback
    expect(processedElements).toEqual(elements);
  });
});

describe("useContactValidationWorker", () => {
  it("provides fallback validation when worker unavailable", async () => {
    const { result } = renderHook(() => useContactValidationWorker());

    const fields = { email: "test@example.com", name: "Test User" };

    const validation = await result.current.validateForm(fields);

    // Should return fallback validation
    expect(validation).toEqual({
      validation: {
        email: { isValid: true, message: "" },
        name: { isValid: true, message: "" },
      },
      isFormValid: true,
    });
  });
});
