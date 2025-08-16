import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@/test/utils/test-utils";
import { HeroSection } from "../Hero";

// Mock the image imports
vi.mock("@/assets/images/grain.jpg", () => ({
  default: { src: "/grain.jpg" },
}));

vi.mock("@/assets/images/me.jpg", () => ({
  default: { src: "/me.jpg" },
}));

// Mock SVG imports
vi.mock("@/assets/icons/arrow-down.svg", () => ({
  default: vi.fn(() => <div data-testid="arrow-down-icon" />),
}));

vi.mock("@/assets/icons/sparkle.svg", () => ({
  default: vi.fn(() => <div data-testid="sparkle-icon" />),
}));

vi.mock("@/assets/icons/star.svg", () => ({
  default: vi.fn(() => <div data-testid="star-icon" />),
}));

// Mock components
vi.mock("@/components/layout", () => ({
  HeroOrbit: vi.fn(({ children }) => <div data-testid="hero-orbit">{children}</div>),
}));

vi.mock("@/components/ui", () => ({
  OptimizedImage: vi.fn(({ alt, className }) => (
    <div className={className} data-testid="optimized-image" aria-label={alt} />
  )),
}));

describe("HeroSection", () => {
  beforeEach(() => {
    // Mock getElementById
    global.document.getElementById = vi.fn((_id) => {
      const element = document.createElement("div");
      element.scrollIntoView = vi.fn();
      return element;
    });
  });

  it("renders hero section with correct content", () => {
    render(<HeroSection />);

    expect(screen.getByText("Muhammad Ahmed Shehzad")).toBeInTheDocument();
    expect(screen.getByText("Available for new projects")).toBeInTheDocument();
    expect(
      screen.getByText(
        "I am a Full Stack Developer with a passion for building web applications and services."
      )
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<HeroSection />);

    expect(screen.getAllByText("Explore My Work")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Let's Connect")[0]).toBeInTheDocument();
  });

  it("handles explore work button click", () => {
    render(<HeroSection />);

    const exploreButtons = screen.getAllByRole("button", { name: /explore my work/i });
    expect(exploreButtons[0]).toBeDefined();
    fireEvent.click(exploreButtons[0]!);

    expect(document.getElementById).toHaveBeenCalledWith("projects");
  });

  it("handles connect button click", () => {
    render(<HeroSection />);

    const connectButtons = screen.getAllByRole("button", { name: /let's connect/i });
    expect(connectButtons[0]).toBeDefined();
    fireEvent.click(connectButtons[0]!);

    expect(document.getElementById).toHaveBeenCalledWith("contact");
  });

  it("renders orbital elements", () => {
    render(<HeroSection />);

    const orbitElements = screen.getAllByTestId("hero-orbit");
    expect(orbitElements.length).toBeGreaterThan(0);
  });

  it("renders optimized image with correct props", () => {
    render(<HeroSection />);

    const images = screen.getAllByTestId("optimized-image");
    expect(images[0]).toHaveAttribute(
      "aria-label",
      "Muhammad Ahmed Shehzad - Professional headshot of a full-stack developer"
    );
  });

  it("has correct section id", () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector("#home");
    expect(section).toBeInTheDocument();
  });
});
