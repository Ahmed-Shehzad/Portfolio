import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BeyondWork } from "../BeyondWork";

describe("BeyondWork", () => {
  it("renders without crashing", () => {
    render(<BeyondWork />);
    expect(screen.getByText("Beyond Work")).toBeInTheDocument();
  });

  it("displays hobbies and interests", () => {
    render(<BeyondWork />);
    expect(screen.getAllByText(/hiking adventures/i)[0]).toBeInTheDocument();
  });
});
