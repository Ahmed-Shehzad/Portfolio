import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWebWorker } from "@/hooks/useWebWorker";

// Covers the branch where Worker is unavailable (e.g., SSR or unsupported)

describe("useWebWorker (no Worker support)", () => {
  it("reports unavailable worker", () => {
    const original = globalThis.Worker;
    delete (globalThis as any).Worker;
    const { result } = renderHook(() => useWebWorker());
    expect(result.current.isWorkerAvailable).toBe(false);
    // Restore
    globalThis.Worker = original;
  });
});
