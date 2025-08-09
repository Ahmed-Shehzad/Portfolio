import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

class MockIntersectionObserver {
  private readonly callback: any;
  constructor(cb: any) {
    this.callback = cb;
  }
  observe() {
    this.callback([{ isIntersecting: true }]);
  }
  // no-op stubs:
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
}
// @ts-expect-error assigning global mock
global.IntersectionObserver = MockIntersectionObserver;

describe("useScrollAnimation", () => {
  it("sets visible when intersecting", async () => {
    const Test = () => {
      const { elementRef, isVisible } = useScrollAnimation();
      // Cast for test purposes; hook ref is HTMLElement
      return <div ref={elementRef as any} data-visible={isVisible} data-testid="anim" />;
    };
    const { getByTestId } = render(<Test />);
    await waitFor(() => {
      const el = getByTestId("anim");
      expect(el.getAttribute("data-visible")).toBe("true");
    });
  });

  it("respects triggerOnce=false toggling", async () => {
    class ToggleObserver {
      private readonly cb: any;
      constructor(cb: any) {
        this.cb = cb;
      }
      observe() {
        this.cb([{ isIntersecting: true }]);
        this.cb([{ isIntersecting: false }]);
      }
      unobserve() {
        /* noop */
      }
      disconnect() {
        /* noop */
      }
    }
    // @ts-expect-error override observer
    global.IntersectionObserver = ToggleObserver;
    const Test = () => {
      const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: false });
      return <div ref={elementRef as any} data-visible={isVisible} data-testid="anim-toggle" />;
    };
    const { getByTestId } = render(<Test />);
    await waitFor(() => {
      const el = getByTestId("anim-toggle");
      expect(el.getAttribute("data-visible")).toBe("false");
    });
  });
});
