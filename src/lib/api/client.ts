/**
 * Fetch-based API Client
 *
 * Enhanced API client using native fetch to replace Axios,
 * reducing bundle size while maintaining the same interface.
 */

import { ENV_CONFIG } from "@/config";
import type { ApiResponse } from "@/shared/types";
import { logger } from "@/shared/utils/production-logger";

const apiLogger = logger.createComponentLogger("APIClient");

// Constants
const REQUEST_SUCCESSFUL_MESSAGE = "Request successful";
const UNKNOWN_ERROR_MESSAGE = "Unknown error";

// Enhanced API Error class (maintaining compatibility)
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Simplified fetch client
class SimpleFetchClient {
  constructor(
    private readonly baseURL: string,
    private readonly timeout: number
  ) {}

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
  ): Promise<{ data: T; status: number; statusText: string }> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const headers: Record<string, string> = {
        Accept: "application/json",
        ...(options.headers as Record<string, string>),
      };

      // Add auth token if available
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers,
        signal: controller.signal,
        ...options,
      };

      if (data && method !== "GET" && method !== "HEAD") {
        if (data instanceof FormData) {
          config.body = data;
        } else {
          config.body = JSON.stringify(data);
          headers["Content-Type"] = "application/json";
        }
      }

      apiLogger.debug("Making API request");

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Handle 401 errors
      if (response.status === 401) {
        apiLogger.warn("Unauthorized request - clearing auth token");
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        throw new ApiError("Unauthorized - redirecting to login", 401);
      }

      if (!response.ok) {
        const errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;
        apiLogger.error("API request failed");
        throw new ApiError(errorMessage, response.status);
      }

      const contentType = response.headers.get("content-type");
      let responseData: T;

      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else if (contentType?.includes("text/")) {
        responseData = (await response.text()) as T;
      } else {
        responseData = (await response.blob()) as T;
      }

      apiLogger.debug("API request successful");

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        apiLogger.error("API request timeout");
        throw new ApiError(`Request timeout after ${this.timeout}ms`, 408);
      }

      const errorMessage = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
      apiLogger.error("API request error");
      throw new ApiError(errorMessage, 0);
    }
  }

  async get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>("POST", endpoint, data, options);
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>("PUT", endpoint, data, options);
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>("PATCH", endpoint, data, options);
  }

  async delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}

// Create the main API client instance
export const apiClient = new SimpleFetchClient(
  ENV_CONFIG.api.baseUrl || "http://localhost:3000/api",
  ENV_CONFIG.api.timeout
);

/**
 * Generic API methods with proper typing (maintaining Axios interface)
 */
function createApiErrorFromFetchError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  const errorMessage = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
  return new ApiError(errorMessage);
}

export const api = {
  /**
   * GET request
   */
  get: async <T = unknown>(url: string, config?: RequestInit): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: REQUEST_SUCCESSFUL_MESSAGE,
      };
    } catch (error) {
      const apiError = createApiErrorFromFetchError(error);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },

  /**
   * POST request
   */
  post: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: REQUEST_SUCCESSFUL_MESSAGE,
      };
    } catch (error) {
      const apiError = createApiErrorFromFetchError(error);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },

  /**
   * PUT request
   */
  put: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: REQUEST_SUCCESSFUL_MESSAGE,
      };
    } catch (error) {
      const apiError = createApiErrorFromFetchError(error);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },

  /**
   * PATCH request
   */
  patch: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: REQUEST_SUCCESSFUL_MESSAGE,
      };
    } catch (error) {
      const apiError = createApiErrorFromFetchError(error);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },

  /**
   * DELETE request
   */
  delete: async <T = unknown>(url: string, config?: RequestInit): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: REQUEST_SUCCESSFUL_MESSAGE,
      };
    } catch (error) {
      const apiError = createApiErrorFromFetchError(error);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },
};

// Export the raw fetch instance for advanced use cases (maintaining compatibility)
export { apiClient as fetchInstance };

// Compatibility exports (so existing imports don't break)
export type AxiosRequestConfig = RequestInit;
export type AxiosResponse<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
};
export type AxiosError = ApiError;
