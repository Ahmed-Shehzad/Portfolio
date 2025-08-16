import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSubmitContactForm } from "../useContactQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = "QueryWrapper";
  return Wrapper;
};

describe("useSubmitContactForm", () => {
  it("returns mutation object", () => {
    const { result } = renderHook(() => useSubmitContactForm({}), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty("mutate");
    expect(result.current).toHaveProperty("isPending");
    expect(result.current).toHaveProperty("error");
  });
});
