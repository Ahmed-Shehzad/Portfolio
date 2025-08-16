import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { ScrollAnimationWrapper } from "../ScrollAnimationWrapper";

vi.mock("@/hooks/useScrollAnimation", () => ({
  useScrollAnimation: vi.fn(() => ({
    ref: { current: null },
    isVisible: false,
  })),
}));

vi.mock("@/lib", () => ({
  scrollAnimationVariants: {
    fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  },
}));

describe("ScrollAnimationWrapper", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children", () => {
    const { getByText } = render(
      <ScrollAnimationWrapper>
        <div>Test content</div>
      </ScrollAnimationWrapper>
    );
    expect(getByText("Test content")).toBeInTheDocument();
  });

  it("applies default animation class", () => {
    const { container } = render(
      <ScrollAnimationWrapper>
        <div>Test</div>
      </ScrollAnimationWrapper>
    );
    expect(container.firstChild).toHaveClass("animate-on-scroll");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollAnimationWrapper className="custom-class">
        <div>Test</div>
      </ScrollAnimationWrapper>
    );
    expect(container.firstChild).toHaveClass("animate-on-scroll", "custom-class");
  });

  it("applies stagger children class", () => {
    const { container } = render(
      <ScrollAnimationWrapper staggerChildren>
        <div>Test</div>
      </ScrollAnimationWrapper>
    );
    expect(container.firstChild).toHaveClass("stagger-children");
  });

  it("renders with custom element type", () => {
    const { container } = render(
      <ScrollAnimationWrapper as="section">
        <div>Test</div>
      </ScrollAnimationWrapper>
    );
    expect(container.firstChild?.tagName).toBe("SECTION");
  });

  it("has correct display name", () => {
    expect(ScrollAnimationWrapper.displayName).toBe("ScrollAnimationWrapper");
  });
});
