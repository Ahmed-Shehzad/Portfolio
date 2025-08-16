import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { HeroOrbit } from "../HeroOrbit";

describe("HeroOrbit", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    size: 100,
    rotation: 45,
  };

  it("renders children", () => {
    const { getByText } = render(
      <HeroOrbit {...defaultProps}>
        <div>Test Child</div>
      </HeroOrbit>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("applies correct size and rotation styles", () => {
    const { container } = render(
      <HeroOrbit {...defaultProps}>
        <div>Test</div>
      </HeroOrbit>
    );

    const sizedDiv = container.querySelector('[style*="width: 100px"]');
    expect(sizedDiv).toBeInTheDocument();
    expect(sizedDiv).toHaveStyle("height: 100px");
    expect(sizedDiv).toHaveStyle("transform: rotate(45deg)");
  });

  it("applies orbit animation when shouldOrbit is true", () => {
    const { container } = render(
      <HeroOrbit {...defaultProps} shouldOrbit orbitDuration="10s">
        <div>Test</div>
      </HeroOrbit>
    );

    const orbitDiv = container.querySelector(".animate-spin");
    expect(orbitDiv).toBeInTheDocument();
    expect(orbitDiv).toHaveStyle("animation-duration: 10s");
  });

  it("applies spin animation when shouldSpin is true", () => {
    const { container } = render(
      <HeroOrbit {...defaultProps} shouldSpin spinDuration="5s">
        <div>Test</div>
      </HeroOrbit>
    );

    const spinElements = container.querySelectorAll(".animate-spin");
    expect(spinElements.length).toBeGreaterThan(0);
  });

  it("applies counter-rotation to children", () => {
    const { container } = render(
      <HeroOrbit size={100} rotation={90}>
        <div>Test</div>
      </HeroOrbit>
    );

    const counterRotatedDiv = container.querySelector('[style*="rotate(-90deg)"]');
    expect(counterRotatedDiv).toBeInTheDocument();
  });

  it("has correct default values for optional props", () => {
    const { container } = render(
      <HeroOrbit {...defaultProps}>
        <div>Test</div>
      </HeroOrbit>
    );

    // Should not have animate-spin class when shouldOrbit and shouldSpin are false
    const animatedElements = container.querySelectorAll(".animate-spin");
    expect(animatedElements).toHaveLength(0);
  });
});
