import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { CardHeader } from "@/components/ui/CardHeader";

vi.mock("@/assets/icons/star.svg", () => ({
  default: (props: any) => <svg data-testid="star" {...props} />,
}));

describe("CardHeader", () => {
  it("renders title and description", () => {
    render(<CardHeader title="Title" description="Desc" />);
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Desc")).toBeTruthy();
  });
});
