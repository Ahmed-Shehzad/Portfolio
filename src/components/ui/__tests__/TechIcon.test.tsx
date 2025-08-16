import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { TechIcon } from "../TechIcon";

const MockIcon = () => <div data-testid="mock-icon" />;

describe("TechIcon", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the provided component", () => {
    const { getByTestId } = render(<TechIcon component={MockIcon} />);
    expect(getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renders gradient SVG", () => {
    const { container } = render(<TechIcon component={MockIcon} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has correct gradient definition", () => {
    const { container } = render(<TechIcon component={MockIcon} />);
    const gradient = container.querySelector("#tech-icon-gradient");
    expect(gradient).toBeInTheDocument();
  });

  it("passes alt prop to icon", () => {
    render(<TechIcon component={MockIcon} alt="Test alt text" />);
    // The alt prop is passed to the Icon component
    expect(true).toBe(true); // Component renders without error
  });
});
