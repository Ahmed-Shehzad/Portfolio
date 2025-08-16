import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { ToolboxItems } from "../ToolboxItems";

vi.mock("@/components/ui", () => ({
  TechIcon: vi.fn(({ alt }) => <div data-testid="tech-icon" aria-label={alt} />),
}));

const mockItems = [
  { title: "React", iconType: "ReactIcon" },
  { title: "TypeScript", iconType: "TypeScriptIcon" },
];

describe("ToolboxItems", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders items", () => {
    const { getAllByTestId } = render(<ToolboxItems items={mockItems} />);
    const techIcons = getAllByTestId("tech-icon");
    expect(techIcons.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<ToolboxItems items={mockItems} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies itemsWrapperClassName", () => {
    const { container } = render(
      <ToolboxItems items={mockItems} itemsWrapperClassName="wrapper-class" />
    );
    const wrapper = container.querySelector(".wrapper-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders items multiple times for animation", () => {
    const { getAllByLabelText } = render(<ToolboxItems items={mockItems} />);
    const reactIcons = getAllByLabelText("React");
    expect(reactIcons.length).toBe(3); // 3 sections
  });

  it("has correct default styling", () => {
    const { container } = render(<ToolboxItems items={mockItems} />);
    expect(container.firstChild).toHaveClass("flex");
  });
});
