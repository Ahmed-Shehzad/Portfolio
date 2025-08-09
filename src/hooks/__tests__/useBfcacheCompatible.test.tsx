import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useBfcacheCompatibleTimeout,
  useBfcacheCompatibleScrollListener,
} from "@/hooks/useBfcacheCompatible";

describe("useBfcacheCompatibleTimeout", () => {
  it("sets and clears timeout, clears on pagehide", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useBfcacheCompatibleTimeout());
    const cb = vi.fn();
    result.current.setBfcacheTimeout(cb, 1000);
    expect(cb).not.toHaveBeenCalled();
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    vi.advanceTimersByTime(1500);
    expect(cb).not.toHaveBeenCalled();
    result.current.setBfcacheTimeout(cb, 500);
    vi.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(1);
    const cb2 = vi.fn();
    const id = result.current.setBfcacheTimeout(cb2, 1000);
    act(() => {
      result.current.clearBfcacheTimeout(id);
    });
    vi.advanceTimersByTime(1200);
    expect(cb2).not.toHaveBeenCalled();
    unmount();
    vi.useRealTimers();
  });
});

describe("useBfcacheCompatibleScrollListener", () => {
  it("invokes callback on scroll and stops after pagehide", () => {
    const cb = vi.fn();
    const originalRaf = global.requestAnimationFrame;
    (global as any).requestAnimationFrame = (fn: FrameRequestCallback) => {
      fn(performance.now());
      return 1 as any;
    };
    renderHook(() => useBfcacheCompatibleScrollListener(cb));
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(cb).toHaveBeenCalledTimes(1);
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(cb).toHaveBeenCalledTimes(1);
    global.requestAnimationFrame = originalRaf;
  });
});
