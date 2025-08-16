import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { Footer } from "../Footer";

// Mock SVG imports
vi.mock("@/assets/icons/arrow-up-right.svg", () => ({
  default: vi.fn(() => <div data-testid="arrow-up-right-icon" />),
}));

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders footer content", () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025. All rights reserved./)).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);

    expect(screen.getAllByText("Github")[0]).toBeInTheDocument();
    expect(screen.getAllByText("LinkedIn")[0]).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("renders social navigation", () => {
    render(<Footer />);

    const nav = screen.getAllByRole("navigation")[0];
    expect(nav).toBeInTheDocument();
  });

  it("has correct footer structure", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });
});
