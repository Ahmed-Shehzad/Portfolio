import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Minimal smoke test to raise coverage on simple UI component

describe("SectionHeader", () => {
  it("renders title and description", () => {
    render(<SectionHeader title="Demo" description="Desc" eyebrow="EYEBROW" />);
    expect(screen.getByText("Demo")).toBeTruthy();
    expect(screen.getByText("Desc")).toBeTruthy();
  });
});
