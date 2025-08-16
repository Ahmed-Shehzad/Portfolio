import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { OpenStreetMap } from "../OpenStreetMap";

// Mock Leaflet
vi.mock("leaflet", () => ({
  default: {
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn(),
      },
    },
    divIcon: vi.fn(),
  },
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: vi.fn(),
    },
  },
  divIcon: vi.fn(),
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

const validProps = {
  center: [33.6844, 73.0479] as [number, number],
  zoom: 10,
};

describe("OpenStreetMap", () => {
  it("renders map container", () => {
    const { getByTestId } = render(<OpenStreetMap {...validProps} />);
    expect(getByTestId("map-container")).toBeInTheDocument();
  });

  it("renders tile layer", () => {
    const { getAllByTestId } = render(<OpenStreetMap {...validProps} />);
    const tileLayers = getAllByTestId("tile-layer");
    expect(tileLayers.length).toBeGreaterThan(0);
    expect(tileLayers[0]).toBeInTheDocument();
  });

  it("renders marker", () => {
    const { getAllByTestId } = render(<OpenStreetMap {...validProps} />);
    const markers = getAllByTestId("marker");
    expect(markers.length).toBeGreaterThan(0);
    expect(markers[0]).toBeInTheDocument();
  });
});
