import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { AboutSection } from "../About";

// Mock components and assets
vi.mock("@/components/ui", () => ({
  Card: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  )),
  CardHeader: vi.fn(({ title, eyebrow, description }) => (
    <div data-testid="card-header">
      <span>{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )),
  OptimizedImage: vi.fn(({ alt, className }) => (
    <div className={className} data-testid="optimized-image" aria-label={alt} />
  )),
  SectionHeader: vi.fn(({ title, eyebrow, description }) => (
    <div data-testid="section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )),
}));

vi.mock("@/components/features/about", () => ({
  PersonalIntroduction: vi.fn(() => (
    <div data-testid="personal-introduction">Personal Introduction</div>
  )),
  ProfessionalGrowth: vi.fn(() => <div data-testid="professional-growth">Professional Growth</div>),
  CoreValues: vi.fn(() => <div data-testid="core-values">Core Values</div>),
  CoreStrengths: vi.fn(() => <div data-testid="core-strengths">Core Strengths</div>),
  BeyondWork: vi.fn(() => <div data-testid="beyond-work">Beyond Work</div>),
}));

vi.mock("@/wrappers", () => ({
  ScrollAnimationWrapper: vi.fn(({ children }) => (
    <div data-testid="scroll-wrapper">{children}</div>
  )),
}));

vi.mock("@/assets/images/me.jpg", () => ({
  default: { src: "/me.jpg" },
}));

describe("AboutSection", () => {
  it("renders section header", () => {
    render(<AboutSection />);

    expect(screen.getByTestId("section-header")).toBeInTheDocument();
  });

  it("renders all about components", () => {
    render(<AboutSection />);

    expect(screen.getAllByTestId("personal-introduction")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("professional-growth")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("core-values")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("core-strengths")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("beyond-work")[0]).toBeInTheDocument();
  });

  it("has correct section id", () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
  });

  it("renders scroll animation wrapper", () => {
    render(<AboutSection />);

    expect(screen.getAllByTestId("scroll-wrapper")[0]).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(() => render(<AboutSection />)).not.toThrow();
  });
});
