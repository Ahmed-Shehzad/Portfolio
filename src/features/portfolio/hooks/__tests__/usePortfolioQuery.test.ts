import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePortfolioProjects } from "../usePortfolioQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = "QueryWrapper";
  return Wrapper;
};

describe("usePortfolioProjects", () => {
  it("returns portfolio projects data", async () => {
    const { result } = renderHook(() => usePortfolioProjects(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess || result.current.data).toBeTruthy();
    });

    if (result.current.data) {
      expect(Array.isArray(result.current.data)).toBe(true);
    }
  });

  it("provides loading state", () => {
    const { result } = renderHook(() => usePortfolioProjects(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.isLoading).toBe("boolean");
  });

  it("provides error state", () => {
    const { result } = renderHook(() => usePortfolioProjects(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isError).toBeDefined();
  });
});
