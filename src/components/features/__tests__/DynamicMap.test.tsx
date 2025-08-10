import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";

// Reusable stub components (defined at top level to avoid deep nesting inside mocks)
const LoadingStub = ({ loader }: { loader: () => React.ReactElement }) => loader();
const OSMStub = (p: any) => (
  <div data-testid="osm" data-center={JSON.stringify(p.center)} data-zoom={p.zoom} />
);
// Factory to build a loading component using provided options
function makeLoadingComponent(options: any) {
  return function DynamicLoading() {
    return <LoadingStub loader={options.loading} />;
  };
}

// Ensure clean module registry each test (dynamic import mocking sensitive)
beforeEach(() => {
  vi.resetModules();
  cleanup();
});

describe("DynamicMap", () => {
  it("shows loading skeleton while map module is loading", async () => {
    vi.doMock("next/dynamic", () => ({
      default: (_unused: unknown, options: any) => makeLoadingComponent(options),
    }));

    const { DynamicMap } = await import("@/components/features/DynamicMap");
    render(<DynamicMap center={[0, 0]} zoom={5} />);

    expect(screen.getByText(/Loading map/i)).toBeTruthy();
  });

  it("renders OpenStreetMap with provided props after load", async () => {
    const center: [number, number] = [31.5204, 74.3587];
    const zoom = 10;

    // Mock dynamic to immediately return a stub component that echoes props
    vi.doMock("next/dynamic", () => ({
      default: () => OSMStub,
    }));

    const { DynamicMap } = await import("@/components/features/DynamicMap");
    render(<DynamicMap center={center} zoom={zoom} className="h-40 w-40" />);

    const el = screen.getByTestId("osm");
    expect(el).toBeTruthy();
    expect(el.getAttribute("data-center")).toBe(JSON.stringify(center));
    expect(el.getAttribute("data-zoom")).toBe(String(zoom));
  });
});
