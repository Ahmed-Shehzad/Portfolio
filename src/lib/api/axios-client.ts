/**
 * Axios-based API Client
 *
 * Enhanced API client using Axios with comprehensive error handling,
 * interceptors, and bulletproof architecture patterns.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ENV_CONFIG } from "@/config";
import type { ApiResponse } from "@/shared/types";
import { secureLog } from "@/shared/utils/logging";

// Enhanced API Error class
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

  static fromAxiosError(error: AxiosError): ApiError {
    const responseData = error.response?.data as { message?: string } | undefined;
    const message = responseData?.message ?? error.message ?? "API request failed";
    const status = error.response?.status;
    const code = error.code;
    const data = error.response?.data;

    return new ApiError(message, status, code, data);
  }
}

// API Client configuration
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

/**
 * Creates an Axios instance with bulletproof configuration
 */
const createAxiosInstance = (config: ApiClientConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  // Request interceptor for adding auth headers and logging
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Log request in development
      if (ENV_CONFIG.isDevelopment) {
        secureLog.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      secureLog.error("API Request Error:", error.message || "Unknown error");
      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  // Response interceptor for handling responses and errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (ENV_CONFIG.isDevelopment) {
        secureLog.debug(`API Response: ${response.status} ${response.config.url}`, response.data);
      }

      return response;
    },
    (error: AxiosError) => {
      // Handle common error scenarios
      if (error.response?.status === 401) {
        // Handle unauthorized - redirect to login or refresh token
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          // You might want to redirect to login page here
        }
      }

      if (error.response && error.response.status >= 500) {
        // Handle server errors - log as error since these are actual errors
        secureLog.error("Server Error:", error.response?.data || "Unknown server error");
      }

      if (error.code === "NETWORK_ERROR") {
        // Handle network errors - log as error since these are actual errors
        secureLog.error("Network Error:", error.message || "Unknown network error");
      }

      return Promise.reject(ApiError.fromAxiosError(error));
    }
  );

  return instance;
};

// Create the main API client instance
export const apiClient = createAxiosInstance({
  baseURL: ENV_CONFIG.api.baseUrl || "http://localhost:3000/api",
  timeout: ENV_CONFIG.api.timeout,
});

/**
 * Generic API methods with proper typing
 */
export const api = {
  /**
   * GET request
   */
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
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
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
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
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
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
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
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
  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: "Request successful",
      };
    } catch (error) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error as AxiosError);
      return {
        success: false,
        error: apiError.message,
        data: apiError.data as T,
      };
    }
  },
};

// Export the raw axios instance for advanced use cases
export { apiClient as axiosInstance };
export type { AxiosRequestConfig, AxiosResponse, AxiosError };
