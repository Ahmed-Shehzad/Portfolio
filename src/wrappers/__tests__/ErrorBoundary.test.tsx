import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/wrappers/ErrorBoundary";

// Component that always throws to assert fallback rendering deterministically
const AlwaysThrows: React.FC = () => {
  throw new Error("Boom");
};

describe("ErrorBoundary", () => {
  it("renders fallback UI with action buttons", () => {
    render(
      <ErrorBoundary>
        <AlwaysThrows />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeTruthy();
    // Both action buttons present
    expect(screen.getAllByRole("button", { name: /Try Again/i })[0]).toBeTruthy();
    expect(screen.getAllByRole("button", { name: /Reload Page/i })[0]).toBeTruthy();
  });
});
