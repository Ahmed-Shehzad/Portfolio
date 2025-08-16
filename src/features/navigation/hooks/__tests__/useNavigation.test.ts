import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNavigation } from "../useNavigation";

// Mock DOM methods
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

// Mock the bfcache hook
vi.mock("@/hooks/useBfcacheCompatible", () => ({
  useBfcacheCompatibleScrollListener: vi.fn(),
}));

describe("useNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.getElementById = vi.fn();
    document.querySelectorAll = vi.fn().mockReturnValue([]);
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.activeSection).toBe("");
  });

  it("scrolls to section", () => {
    const mockElement = {
      offsetTop: 100,
    };
    document.getElementById = vi.fn().mockReturnValue(mockElement);

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigationClick("#about", "about");
    });

    expect(document.getElementById).toHaveBeenCalledWith("about");
  });

  it("handles missing section element", () => {
    document.getElementById = vi.fn().mockReturnValue(null);

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigationClick("#missing", "missing");
    });

    expect(document.getElementById).toHaveBeenCalledWith("missing");
  });
});
