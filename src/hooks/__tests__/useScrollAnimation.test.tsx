import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Utility to create a test component using the hook
const createTest = (hookProps?: Parameters<typeof useScrollAnimation>[0]) => {
  const Test: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation(hookProps);
    return <div ref={elementRef as any} data-testid="anim" data-visible={isVisible} />;
  };
  return Test;
};

describe("useScrollAnimation", () => {
  let originalIO: any;
  let callback: IntersectionObserverCallback | null;
  let unobserveMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalIO = global.IntersectionObserver;
    callback = null;
    unobserveMock = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation((cb: IntersectionObserverCallback) => {
      callback = cb;
      return {
        observe: vi.fn(),
        unobserve: unobserveMock,
        disconnect: vi.fn(),
      } as unknown as IntersectionObserver;
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    global.IntersectionObserver = originalIO;
  });

  const trigger = (isIntersecting: boolean) => {
    callback?.(
      [{ isIntersecting } as IntersectionObserverEntry] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );
  };

  it("sets visible immediately when IntersectionObserver is missing", () => {
    // Remove API then render
    // @ts-expect-error intentional delete
    delete global.IntersectionObserver;
    const Test = createTest();
    const { getByTestId } = render(<Test />);
    expect(getByTestId("anim").getAttribute("data-visible")).toBe("true");
    // restore for subsequent tests
    global.IntersectionObserver = originalIO;
  });

  it("becomes visible when intersecting (no delay)", async () => {
    const Test = createTest({ delay: 0 });
    const { getByTestId } = render(<Test />);
    expect(getByTestId("anim").getAttribute("data-visible")).toBe("false");
    trigger(true);
    await waitFor(() => expect(getByTestId("anim").getAttribute("data-visible")).toBe("true"));
  });

  it("applies delay before setting visible", async () => {
    const Test = createTest({ delay: 15 });
    const { getByTestId } = render(<Test />);
    expect(getByTestId("anim").getAttribute("data-visible")).toBe("false");
    trigger(true);
    // Immediately after triggering but before delay elapsed
    expect(getByTestId("anim").getAttribute("data-visible")).toBe("false");
    await waitFor(() => expect(getByTestId("anim").getAttribute("data-visible")).toBe("true"));
  });

  it("unobserves after first intersection when triggerOnce (default)", async () => {
    const Test = createTest();
    const { getByTestId } = render(<Test />);
    trigger(true);
    await waitFor(() => expect(getByTestId("anim").getAttribute("data-visible")).toBe("true"));
    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it("toggles visibility when triggerOnce = false", async () => {
    const Test = createTest({ triggerOnce: false });
    const { getByTestId } = render(<Test />);
    trigger(true);
    await waitFor(() => expect(getByTestId("anim").getAttribute("data-visible")).toBe("true"));
    trigger(false);
    await waitFor(() => expect(getByTestId("anim").getAttribute("data-visible")).toBe("false"));
  });
});
