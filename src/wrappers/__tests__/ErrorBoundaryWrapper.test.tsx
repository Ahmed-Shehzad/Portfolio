import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import { ErrorBoundaryWrapper } from "../ErrorBoundaryWrapper";

vi.mock("../ErrorBoundary", () => ({
  ErrorBoundary: vi.fn(({ children }) => <div data-testid="error-boundary">{children}</div>),
}));

describe("ErrorBoundaryWrapper", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children within ErrorBoundary", () => {
    const { getByText, getByTestId } = render(
      <ErrorBoundaryWrapper>
        <div>Test Content</div>
      </ErrorBoundaryWrapper>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("passes children to ErrorBoundary", () => {
    const { getByText } = render(
      <ErrorBoundaryWrapper>
        <span>Child Component</span>
      </ErrorBoundaryWrapper>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
