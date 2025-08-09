import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Card } from "@/components/ui/Card";
import React from "react";

// Simple smoke test

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>Content</Card>);
    expect(getByText("Content")).toBeTruthy();
  });
});
