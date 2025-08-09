import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWebWorker } from "@/hooks/useWebWorker";

// Basic mock Worker implementation
class MockWorker {
  onmessage: ((ev: MessageEvent) => any) | null = null;
  onerror: ((ev: any) => any) | null = null;
  postMessage(data: any) {
    // Simulate async processing + echo back
    setTimeout(() => {
      if (data.type === "TEST_TASK") {
        this.onmessage?.({
          data: { type: "TEST_TASK_DONE", data: { echoed: data.data }, id: data.id },
        } as any);
      } else {
        this.onmessage?.({ data: { type: "ERROR", data: "Unknown task", id: data.id } } as any);
      }
    }, 5);
  }
  terminate() {
    // no-op for mock
  }
}

globalThis.Worker = MockWorker as any;

describe("useWebWorker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("executes a task and resolves", async () => {
    const { result } = renderHook(() => useWebWorker());
    let response: any;
    await act(async () => {
      const promise = result.current.executeTask("TEST_TASK", { value: 42 });
      // Fast-forward the worker's internal setTimeout
      vi.runAllTimers();
      response = await promise;
    });
    expect(response.data.echoed.value).toBe(42);
  });

  it("handles unknown task error", async () => {
    const { result } = renderHook(() => useWebWorker());
    await expect(
      act(async () => {
        const promise = result.current.executeTask("UNKNOWN_TASK", {} as any);
        vi.runAllTimers();
        await promise;
      })
    ).rejects.toThrow();
  });
});
