import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { CardHeader } from "../CardHeader";

vi.mock("@/assets/icons/star.svg", () => ({
  default: vi.fn(() => <div data-testid="star-icon" />),
}));

describe("CardHeader", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    title: "Test Title",
    description: "Test description",
  };

  it("renders title and description", () => {
    render(<CardHeader {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders star icon", () => {
    render(<CardHeader {...defaultProps} />);
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CardHeader {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has correct default styling", () => {
    const { container } = render(<CardHeader {...defaultProps} />);
    expect(container.firstChild).toHaveClass("flex", "flex-col", "p-6");
  });
});
