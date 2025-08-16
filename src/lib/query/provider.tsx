/**
 * React Query Provider
 *
 * Provider component for TanStack React Query with devtools.
 */

"use client";

import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config";
import { ENV_CONFIG } from "@/config";

interface QueryProviderProps {
  readonly children: ReactNode;
}

/**
 * Query Provider component that wraps the app with React Query context
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ENV_CONFIG.isDevelopment && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  );
};
