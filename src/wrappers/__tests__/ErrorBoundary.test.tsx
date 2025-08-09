import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/wrappers/ErrorBoundary";

// Component that always throws to assert fallback rendering deterministically
const AlwaysThrows: React.FC = () => {
  throw new Error("Boom");
};

// Component that throws only on its very first render (using a ref to avoid StrictMode double-invoke issues)
const ThrowThenRecover: React.FC = () => {
  const first = React.useRef(true);
  if (first.current) {
    first.current = false;
    throw new Error("Boom");
  }
  return <div>Recovered</div>;
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
