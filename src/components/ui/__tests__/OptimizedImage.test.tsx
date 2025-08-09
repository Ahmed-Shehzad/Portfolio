import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Mock next/image for unit test environment
// Mock next/image with a basic img wrapper (tests focus on conditional structure)
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img alt={props.alt || "img"} {...props} />,
}));

describe("OptimizedImage", () => {
  it("renders fallback when no next-gen sources", () => {
    const { container } = render(
      <OptimizedImage src="/img.png" alt="alt" width={100} height={100} />
    );
    expect(container.querySelector("img")).toBeTruthy();
  });

  it("renders picture element with sources when provided", () => {
    const { container } = render(
      <OptimizedImage
        src="/img.png"
        webpSrc="/img.webp"
        avifSrc="/img.avif"
        alt="alt"
        width={100}
        height={100}
      />
    );
    expect(container.querySelector('picture source[type="image/webp"]')).toBeTruthy();
    expect(container.querySelector('picture source[type="image/avif"]')).toBeTruthy();
  });
});
