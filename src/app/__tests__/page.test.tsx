import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@/test/utils/test-utils";
import Home from "../page";

// Mock all the section components
vi.mock("@/sections", () => ({
  Header: vi.fn(() => <header data-testid="header">Header</header>),
  HeroSection: vi.fn(() => <section data-testid="hero">Hero</section>),
  ProjectsSection: vi.fn(() => <section data-testid="projects">Projects</section>),
  TapeSection: vi.fn(() => <section data-testid="tape">Tape</section>),
  TestimonialsSection: vi.fn(() => <section data-testid="testimonials">Testimonials</section>),
  AboutSection: vi.fn(() => <section data-testid="about">About</section>),
  ContactSection: vi.fn(() => <section data-testid="contact">Contact</section>),
  Footer: vi.fn(() => <footer data-testid="footer">Footer</footer>),
}));

// Mock dynamic imports to return the actual components
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: (importFn: () => Promise<any>, _options?: any) => {
    // Return the component directly for testing
    const MockComponent = vi.fn(() => {
      // Determine which component based on the import function
      const importStr = importFn.toString();
      if (importStr.includes("HeaderSection")) {
        return <header data-testid="header">Header</header>;
      }
      if (importStr.includes("HeroSection")) {
        return <section data-testid="hero">Hero</section>;
      }
      if (importStr.includes("ProjectsSection")) {
        return <section data-testid="projects">Projects</section>;
      }
      if (importStr.includes("TapeSection")) {
        return <section data-testid="tape">Tape</section>;
      }
      if (importStr.includes("TestimonialsSection")) {
        return <section data-testid="testimonials">Testimonials</section>;
      }
      if (importStr.includes("AboutSection")) {
        return <section data-testid="about">About</section>;
      }
      if (importStr.includes("ContactSection")) {
        return <section data-testid="contact">Contact</section>;
      }
      if (importStr.includes("Footer")) {
        return <footer data-testid="footer">Footer</footer>;
      }
      return <div data-testid="dynamic-component">Dynamic Component</div>;
    }) as React.ComponentType & { displayName?: string };
    MockComponent.displayName = "MockedDynamicComponent";
    return MockComponent;
  },
}));

describe("Home Page", () => {
  it("renders all main sections", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("header")).toBeInTheDocument();
    expect(getByTestId("hero")).toBeInTheDocument();
    expect(getByTestId("projects")).toBeInTheDocument();
    expect(getByTestId("tape")).toBeInTheDocument();
    expect(getByTestId("testimonials")).toBeInTheDocument();
    expect(getByTestId("about")).toBeInTheDocument();
    expect(getByTestId("contact")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("has correct component structure", () => {
    const { container } = render(<Home />);

    // Should render a fragment with multiple children
    expect(container.children.length).toBeGreaterThan(0);
  });
});
