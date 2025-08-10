import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "@/sections/Header";

describe("Header navigation", () => {
  it("renders all nav links", () => {
    render(<Header />);
    ["Home", "Projects", "About", "Contact"].forEach((text) => {
      expect(screen.getByRole("link", { name: new RegExp(text, "i") })).toBeTruthy();
    });
  });
});
