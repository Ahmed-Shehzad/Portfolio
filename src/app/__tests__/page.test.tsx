import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";

// Provide deterministic dynamic mock producing placeholder components
let dynIndex = 0;
const dynLabels = [
  "ProjectsMarker",
  "TapeMarker",
  "TestimonialsMarker",
  "AboutMarker",
  "ContactMarker",
  "FooterMarker",
];
vi.mock("next/dynamic", () => ({
  default: () => () => <div>{dynLabels[dynIndex++]}</div>,
}));

vi.mock("@/sections", () => ({
  Header: () => <div>HeaderMarker</div>,
  HeroSection: () => <div>HeroMarker</div>,
}));

import Home from "@/app/page";

describe("Home page", () => {
  it("renders static and dynamic section placeholders", () => {
    render(<Home />);
    expect(screen.getByText("HeaderMarker")).toBeTruthy();
    expect(screen.getByText("HeroMarker")).toBeTruthy();
    dynLabels.forEach((label) => expect(screen.getByText(label)).toBeTruthy());
  });
});
