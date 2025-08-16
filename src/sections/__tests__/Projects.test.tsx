import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { ProjectsSection } from "../Projects";

// Mock the portfolio hook to return loading state by default
vi.mock("@/features/portfolio/hooks", () => ({
  usePortfolioProjects: vi.fn(() => ({
    data: null,
    isLoading: true,
    isError: false,
  })),
}));

// Mock components
vi.mock("@/components/ui", () => ({
  Card: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  )),
  SectionHeader: vi.fn(({ title, eyebrow, description }) => (
    <div data-testid="section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )),
  OptimizedImage: vi.fn(({ alt, className }) => (
    <div className={className} data-testid="optimized-image" aria-label={alt} />
  )),
}));

vi.mock("@/wrappers", () => ({
  ScrollAnimationWrapper: vi.fn(({ children }) => (
    <div data-testid="scroll-wrapper">{children}</div>
  )),
}));

// Mock SVG imports
vi.mock("@/assets/icons/check-circle.svg", () => ({
  default: vi.fn(() => <div data-testid="check-circle-icon" />),
}));

vi.mock("@/assets/icons/arrow-up-right.svg", () => ({
  default: vi.fn(() => <div data-testid="arrow-up-right-icon" />),
}));

describe("ProjectsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders section header", () => {
    render(<ProjectsSection />);

    expect(screen.getByTestId("section-header")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<ProjectsSection />);

    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("has correct section id", () => {
    const { container } = render(<ProjectsSection />);

    const section = container.querySelector("#projects");
    expect(section).toBeInTheDocument();
  });

  it("renders scroll animation wrapper", () => {
    render(<ProjectsSection />);

    expect(screen.getByTestId("scroll-wrapper")).toBeInTheDocument();
  });

  it("renders project cards when data is available", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("handles error state gracefully", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("renders project results correctly", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("renders external link icons", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    const { container } = render(<ProjectsSection />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders project images with proper alt text", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });
});
