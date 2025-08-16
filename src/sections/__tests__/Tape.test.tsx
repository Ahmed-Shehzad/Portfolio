import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { TapeSection } from "../Tape";

vi.mock("@/assets/icons/star.svg", () => ({
  default: vi.fn(() => <div data-testid="star-icon" />),
}));

vi.mock("@/wrappers", () => ({
  ScrollAnimationWrapper: vi.fn(({ children, className }) => (
    <div className={className} data-testid="scroll-wrapper">
      {children}
    </div>
  )),
}));

describe("TapeSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders section with correct id", () => {
    const { container } = render(<TapeSection />);
    const section = container.querySelector("#tape");
    expect(section).toBeInTheDocument();
  });

  it("renders technology words", () => {
    render(<TapeSection />);
    expect(screen.getAllByText("React")[0]).toBeInTheDocument();
    expect(screen.getAllByText("TypeScript")[0]).toBeInTheDocument();
    expect(screen.getAllByText("C#")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Docker")[0]).toBeInTheDocument();
  });

  it("renders duplicate sets for animation", () => {
    render(<TapeSection />);
    const reactElements = screen.getAllByText("React");
    expect(reactElements).toHaveLength(2);
  });

  it("has aria-hidden on second duplicate", () => {
    const { container } = render(<TapeSection />);
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(ariaHiddenElements.length).toBeGreaterThan(0);
  });

  it("renders star icons", () => {
    render(<TapeSection />);
    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it("has correct animation classes", () => {
    const { container } = render(<TapeSection />);
    const animatedDiv = container.querySelector(".animate-\\[move-left_30s_linear_infinite\\]");
    expect(animatedDiv).toBeInTheDocument();
  });
});
