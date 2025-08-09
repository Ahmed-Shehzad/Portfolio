import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "@/sections/Hero";
import { AboutSection } from "@/sections/About";
import { ProjectsSection } from "@/sections/Projects";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

// Generic mock for all SVG imports used inside sections
vi.mock("@/assets/icons/arrow-down.svg", () => ({
  default: (p: any) => <svg data-icon="arrow-down" {...p} />,
}));
vi.mock("@/assets/icons/sparkle.svg", () => ({
  default: (p: any) => <svg data-icon="sparkle" {...p} />,
}));
vi.mock("@/assets/icons/star.svg", () => ({
  default: (p: any) => <svg data-icon="star" {...p} />,
}));
vi.mock("@/assets/icons/arrow-up-right.svg", () => ({
  default: (p: any) => <svg data-icon="arrow-up-right" {...p} />,
}));
vi.mock("@/assets/icons/check-circle.svg", () => ({
  default: (p: any) => <svg data-icon="check-circle" {...p} />,
}));

vi.mock("next/dynamic", () => ({
  default: (fn: any) => {
    const Comp = fn();
    return Comp?.default || (() => <div data-testid="dynamic" />);
  },
}));

vi.mock("@/components/features", () => ({
  DynamicMap: () => <div data-testid="map" />,
  ToolboxItems: (props: any) => (
    <div data-testid="toolbox" {...props}>
      Toolbox
    </div>
  ),
  ContactModal: ({ isOpen }: { isOpen: boolean }) => (isOpen ? <dialog open>Modal</dialog> : null),
}));

class IO {
  _cb: any;
  constructor(cb: any) {
    this._cb = cb;
  }
  observe() {
    this._cb([{ isIntersecting: true }]);
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
}
// @ts-expect-error global assign
global.IntersectionObserver = IO;

describe("Sections smoke rendering", () => {
  // Provide a minimal Worker shim to avoid React internal instanceof checks throwing
  let originalWorker: any;
  beforeAll(() => {
    originalWorker = (global as any).Worker;
    (global as any).Worker = function () {} as any;
  });
  afterAll(() => {
    (global as any).Worker = originalWorker;
  });
  it("renders HeroSection with heading and buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Muhammad Ahmed Shehzad/i)).toBeTruthy();
    expect(screen.getByText(/Explore My Work/i)).toBeTruthy();
    expect(screen.getByText(/Let.*Connect/i)).toBeTruthy();
  });

  it("renders AboutSection primary header", () => {
    render(<AboutSection />);
    expect(screen.getByText(/My Journey as a Developer/i)).toBeTruthy();
    expect(screen.getAllByText(/Full Stack Developer/i).length).toBeGreaterThan(0);
  });

  it("renders ProjectsSection with project cards", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Featured Projects/i)).toBeTruthy();
    expect(screen.getAllByText(/View Project/i).length).toBeGreaterThan(0);
  });

  it("renders TapeSection marquee words", () => {
    render(<TapeSection />);
    expect(screen.getAllByText(/React/).length).toBeGreaterThan(0);
  });

  it("renders TestimonialsSection with header and some testimonial text", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Happy Clients/i)).toBeTruthy();
    // Use getAllBy to avoid duplicate error due to marquee duplication
    expect(screen.getAllByText(/game-changer/i).length).toBeGreaterThan(0);
  });

  it("renders ContactSection and opens modal on click", () => {
    render(<ContactSection />);
    const btn = screen.getByText(/Contact Me/i);
    fireEvent.click(btn);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("renders Footer links", () => {
    render(<Footer />);
    expect(screen.getByText(/Github/i)).toBeTruthy();
    expect(screen.getByText(/LinkedIn/i)).toBeTruthy();
  });
});
