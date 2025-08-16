import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfessionalGrowth } from "../ProfessionalGrowth";

describe("ProfessionalGrowth", () => {
  it("renders without crashing", () => {
    render(<ProfessionalGrowth />);
    expect(screen.getByText(/growth/i)).toBeInTheDocument();
  });

  it("displays career progression", () => {
    render(<ProfessionalGrowth />);
    const content = screen.getAllByText(/growth/i);
    expect(content.length).toBeGreaterThan(0);
  });
});
