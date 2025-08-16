import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@/test/utils/test-utils";
import { TestimonialsSection } from "../Testimonials";

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
  OptimizedImage: vi.fn(({ alt, src }) => (
    <img data-testid="optimized-image" alt={alt} src={src} />
  )),
}));

vi.mock("@/wrappers", () => ({
  ScrollAnimationWrapper: vi.fn(({ children }) => (
    <div data-testid="scroll-wrapper">{children}</div>
  )),
}));

describe("TestimonialsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders section with correct id", () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector("#testimonials");
    expect(section).toBeInTheDocument();
  });

  it("renders section header", () => {
    render(<TestimonialsSection />);
    expect(screen.getByTestId("section-header")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("renders testimonial cards", () => {
    render(<TestimonialsSection />);
    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders client names", () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByText("Sarah Chen")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Marcus Rivera")[0]).toBeInTheDocument();
  });

  it("renders star ratings", () => {
    const { container } = render(<TestimonialsSection />);
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBeGreaterThan(0);
  });

  it("has duplicate testimonials for animation", () => {
    render(<TestimonialsSection />);
    const sarahElements = screen.getAllByText("Sarah Chen");
    expect(sarahElements).toHaveLength(2);
  });

  it("has correct display name", () => {
    expect(TestimonialsSection.displayName).toBe("TestimonialsSection");
  });
});
