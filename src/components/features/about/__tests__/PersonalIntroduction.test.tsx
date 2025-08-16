import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PersonalIntroduction } from "../PersonalIntroduction";

describe("PersonalIntroduction", () => {
  it("renders without crashing", () => {
    render(<PersonalIntroduction />);
    expect(screen.getAllByText(/backend developer/i)[0]).toBeInTheDocument();
  });

  it("displays personal information", () => {
    render(<PersonalIntroduction />);
    const content = screen.getAllByText(/muhammad ahmed shehzad/i)[0];
    expect(content).toBeInTheDocument();
  });
});
