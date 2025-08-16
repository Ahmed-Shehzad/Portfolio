import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@/test/utils/test-utils";
import RootLayout, { metadata } from "../layout";

vi.mock("@/wrappers/ErrorBoundaryWrapper", () => ({
  ErrorBoundaryWrapper: vi.fn(({ children }) => <div data-testid="error-boundary">{children}</div>),
}));

vi.mock("@/lib/query/provider", () => ({
  QueryProvider: vi.fn(({ children }) => <div data-testid="query-provider">{children}</div>),
}));

vi.mock("next/font/google", () => ({
  Inter: vi.fn(() => ({ variable: "--font-sans" })),
  Calistoga: vi.fn(() => ({ variable: "--font-serif" })),
}));

describe("RootLayout", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children within providers", () => {
    const { getByText, getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByTestId("error-boundary")).toBeInTheDocument();
    expect(getByTestId("query-provider")).toBeInTheDocument();
  });

  it("applies correct body classes", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    expect(document.body).toHaveClass("bg-gray-900", "font-sans", "text-white", "antialiased");
  });

  it("includes font variables", () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    expect(document.body).toHaveClass("--font-sans", "--font-serif");
  });

  describe("metadata", () => {
    it("has correct title", () => {
      expect(metadata.title).toBe(
        "Muhammad Ahmed Shehzad - Backend Developer & Full Stack Engineer"
      );
    });

    it("has correct description", () => {
      expect(metadata.description).toContain(
        "Backend Developer specializing in C#, .NET, TypeScript"
      );
    });

    it("includes relevant keywords", () => {
      expect(metadata.keywords).toContain("Backend Developer");
      expect(metadata.keywords).toContain("C#");
      expect(metadata.keywords).toContain(".NET");
      expect(metadata.keywords).toContain("TypeScript");
    });

    it("has correct Open Graph data", () => {
      expect(metadata.openGraph?.title).toBe(
        "Muhammad Ahmed Shehzad - Backend Developer & Full Stack Engineer"
      );
      expect(metadata.openGraph?.type).toBe("website");
      expect(metadata.openGraph?.locale).toBe("en_US");
    });

    it("has correct Twitter card data", () => {
      expect(metadata.twitter?.card).toBe("summary_large_image");
      expect(metadata.twitter?.creator).toBe("@ahmed_shehzad");
    });

    it("has correct robots configuration", () => {
      expect(metadata.robots?.index).toBe(true);
      expect(metadata.robots?.follow).toBe(true);
    });
  });
});
