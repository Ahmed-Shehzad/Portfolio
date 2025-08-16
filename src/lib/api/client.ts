/**
 * API Client
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export const createApiClient = (config: ApiClientConfig = {}): AxiosInstance => {
  const defaultConfig: AxiosRequestConfig = {
    baseURL: config.baseURL || "/api",
    timeout: config.timeout || 10000,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  };

  return axios.create(defaultConfig);
};
