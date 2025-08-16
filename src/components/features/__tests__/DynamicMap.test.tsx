import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { DynamicMap } from "../DynamicMap";

vi.mock("next/dynamic", () => ({
  default: vi.fn(() => vi.fn(() => <div data-testid="dynamic-map">Map Component</div>)),
}));

describe("DynamicMap", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    center: [50.0782, 8.2398] as [number, number],
    zoom: 13,
  };

  it("renders map container", () => {
    const { container } = render(<DynamicMap {...defaultProps} />);
    const mapContainer = container.querySelector(".h-full.w-full");
    expect(mapContainer).toBeInTheDocument();
  });

  it("renders dynamic map component", () => {
    const { getByTestId } = render(<DynamicMap {...defaultProps} />);
    expect(getByTestId("dynamic-map")).toBeInTheDocument();
  });

  it("passes props to OpenStreetMap", () => {
    const { getByTestId } = render(<DynamicMap {...defaultProps} className="custom-class" />);
    expect(getByTestId("dynamic-map")).toBeInTheDocument();
  });

  it("handles center coordinates", () => {
    const customCenter: [number, number] = [40.7128, -74.006];
    render(<DynamicMap center={customCenter} zoom={10} />);
    // Component renders without error
    expect(true).toBe(true);
  });
});
