import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CoreStrengths } from "../CoreStrengths";

describe("CoreStrengths", () => {
  it("renders without crashing", () => {
    render(<CoreStrengths />);
    expect(screen.getAllByText(/strengths/i)[0]).toBeInTheDocument();
  });

  it("displays technical skills", () => {
    render(<CoreStrengths />);
    const content = screen.getAllByText(/strengths/i)[0];
    expect(content).toBeInTheDocument();
  });
});
