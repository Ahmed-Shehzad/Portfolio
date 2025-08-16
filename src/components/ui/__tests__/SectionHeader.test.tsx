import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { SectionHeader } from "../SectionHeader";

describe("SectionHeader", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    title: "Test Title",
    eyebrow: "Test Eyebrow",
    description: "Test description",
  };

  it("renders all text content", () => {
    render(<SectionHeader {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("has correct heading structure", () => {
    render(<SectionHeader {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Title");
  });

  it("applies gradient styling to eyebrow", () => {
    render(<SectionHeader {...defaultProps} />);
    const eyebrow = screen.getByText("Test Eyebrow");
    expect(eyebrow).toHaveClass("bg-gradient-to-r", "from-emerald-300", "to-sky-400");
  });

  it("has centered layout", () => {
    render(<SectionHeader {...defaultProps} />);
    const eyebrow = screen.getByText("Test Eyebrow");
    const title = screen.getByText("Test Title");
    const description = screen.getByText("Test description");

    expect(eyebrow).toHaveClass("text-center");
    expect(title).toHaveClass("text-center");
    expect(description).toHaveClass("text-center");
  });
});
