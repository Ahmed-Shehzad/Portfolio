import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { CoreValues } from "../CoreValues";

// Mock next/dynamic
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const MockComponent = () => <div data-testid="dynamic-map">Map Component</div>;
    return MockComponent;
  },
}));

describe("CoreValues", () => {
  it("renders without crashing", () => {
    render(<CoreValues />);
    expect(screen.getByText("Core Values")).toBeInTheDocument();
  });

  it("displays professional values", () => {
    render(<CoreValues />);
    const qualityFirst = screen.getAllByText("Quality First");
    const innovation = screen.getAllByText("Innovation");
    expect(qualityFirst.length).toBeGreaterThanOrEqual(1);
    expect(innovation.length).toBeGreaterThanOrEqual(1);
  });
});
