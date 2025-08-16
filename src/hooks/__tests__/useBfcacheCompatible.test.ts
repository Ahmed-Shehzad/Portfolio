import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBfcacheCompatibleScrollListener } from "../useBfcacheCompatible";

describe("useBfcacheCompatibleScrollListener", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("initializes without errors", () => {
    const callback = vi.fn();

    expect(() => {
      renderHook(() => useBfcacheCompatibleScrollListener(callback));
    }).not.toThrow();
  });

  it("calls callback on scroll", () => {
    const callback = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => useBfcacheCompatibleScrollListener(callback));

    // Verify event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: true,
    });

    addEventListenerSpy.mockRestore();
  });

  it("handles pageshow event", () => {
    const callback = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => useBfcacheCompatibleScrollListener(callback));

    // Verify pageshow event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith("pageshow", expect.any(Function), {
      passive: true,
    });

    addEventListenerSpy.mockRestore();
  });

  it("cleans up event listeners on unmount", () => {
    const callback = vi.fn();
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useBfcacheCompatibleScrollListener(callback));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("pageshow", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("pagehide", expect.any(Function));
  });
});
