/**
 * React Query Configuration
 *
 * Centralized configuration for TanStack React Query with bulletproof defaults.
 */

import { QueryClient } from "@tanstack/react-query";
import { ENV_CONFIG } from "@/config";

// Time constants in milliseconds
const FIVE_MINUTES_MS = 5 * 60 * 1000;
const TEN_MINUTES_MS = 10 * 60 * 1000;
const ONE_SECOND_MS = 1000;
const THIRTY_SECONDS_MS = 30 * 1000;

// HTTP status code ranges
const CLIENT_ERROR_MIN = 400;
const CLIENT_ERROR_MAX = 499;

// Retry configuration
const MAX_RETRY_ATTEMPTS = 3;
const EXPONENTIAL_BASE = 2;

// Default query options following bulletproof patterns
export const defaultQueryOptions = {
  queries: {
    // Stale time - how long data stays fresh
    staleTime: FIVE_MINUTES_MS, // 5 minutes

    // Cache time - how long data stays in cache after becoming unused
    gcTime: TEN_MINUTES_MS, // 10 minutes (was cacheTime in v4)

    // Retry configuration
    retry: (failureCount: number, error: unknown) => {
      // Don't retry on 4xx errors (client errors)
      if (error && typeof error === "object" && "status" in error) {
        const status = error.status as number;
        if (status >= CLIENT_ERROR_MIN && status <= CLIENT_ERROR_MAX) {
          return false;
        }
      }

      // Retry up to 3 times for other errors
      return failureCount < MAX_RETRY_ATTEMPTS;
    },

    // Retry delay with exponential backoff
    retryDelay: (attemptIndex: number) =>
      Math.min(ONE_SECOND_MS * EXPONENTIAL_BASE ** attemptIndex, THIRTY_SECONDS_MS),

    // Refetch on window focus (disable in development for better DX)
    refetchOnWindowFocus: ENV_CONFIG.isProduction,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Refetch on mount if data is stale
    refetchOnMount: true,
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,

    // Retry delay for mutations
    retryDelay: ONE_SECOND_MS,
  },
} as const;

/**
 * Creates a configured QueryClient instance
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: defaultQueryOptions,
  });
};

// Global query client instance
export const queryClient = createQueryClient();

// Query keys factory for consistent key management
export const queryKeys = {
  // Base keys
  all: ["app"] as const,

  // Contact queries
  contact: () => [...queryKeys.all, "contact"] as const,
  contactSubmit: (data: unknown) => [...queryKeys.contact(), "submit", data] as const,

  // Portfolio/Projects queries
  projects: () => [...queryKeys.all, "projects"] as const,
  projectsList: (filters?: unknown) => [...queryKeys.projects(), "list", filters] as const,
  projectDetail: (id: string) => [...queryKeys.projects(), "detail", id] as const,

  // User/Profile queries
  user: () => [...queryKeys.all, "user"] as const,
  userProfile: (id: string) => [...queryKeys.user(), "profile", id] as const,

  // Settings queries
  settings: () => [...queryKeys.all, "settings"] as const,

  // Analytics queries
  analytics: () => [...queryKeys.all, "analytics"] as const,
  analyticsMetrics: (timeRange?: string) =>
    [...queryKeys.analytics(), "metrics", timeRange] as const,
} as const;

// Query key utilities
export const queryKeyUtils = {
  /**
   * Invalidates all queries matching a pattern
   */
  invalidatePattern: async (pattern: readonly unknown[]) => {
    await queryClient.invalidateQueries({
      queryKey: pattern,
    });
  },

  /**
   * Removes all queries matching a pattern
   */
  removePattern: (pattern: readonly unknown[]) => {
    queryClient.removeQueries({
      queryKey: pattern,
    });
  },

  /**
   * Prefetches data
   */
  prefetch: async <T>(
    queryKey: readonly unknown[],
    queryFn: () => Promise<T>,
    options?: { staleTime?: number }
  ) => {
    const prefetchOptions: {
      queryKey: readonly unknown[];
      queryFn: () => Promise<T>;
      staleTime?: number;
    } = {
      queryKey,
      queryFn,
    };

    if (options?.staleTime !== undefined) {
      prefetchOptions.staleTime = options.staleTime;
    }

    await queryClient.prefetchQuery(prefetchOptions);
  },
};
