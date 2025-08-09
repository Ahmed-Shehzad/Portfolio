import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter" }),
  Calistoga: () => ({ variable: "font-calistoga" }),
}));

import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("wraps children", () => {
    render(
      <RootLayout>
        <div>ChildContent</div>
      </RootLayout>
    );
    expect(screen.getByText("ChildContent")).toBeTruthy();
  });
});
