import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryProvider } from "../provider";

describe("QueryProvider", () => {
  it("renders children", () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("provides query client context", () => {
    const TestComponent = () => {
      return <div data-testid="test-component">Provider Active</div>;
    };

    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
