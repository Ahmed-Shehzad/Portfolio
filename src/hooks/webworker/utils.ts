/**
 * Web Worker Utility Functions
 */

import { secureLog } from "@/shared/utils/logging";
import { UNKNOWN_ERROR_MESSAGE, UNKNOWN_MESSAGE } from "./constants";

// Helper function to extract error message from unknown data
export const extractErrorMessage = (data: unknown): string => {
  if (typeof data === "string") {
    return data;
  }
  if (data && typeof data === "object") {
    // Check if it's an Error object first
    if ("message" in data) {
      return (data as { message: unknown }).message?.toString() || UNKNOWN_MESSAGE;
    }
    try {
      // Try to serialize the object to JSON for meaningful output
      return JSON.stringify(data);
    } catch {
      // If JSON.stringify fails, fall back to a descriptive message
      return "Error object (non-serializable)";
    }
  }
  return data?.toString() || UNKNOWN_ERROR_MESSAGE;
};

// Helper function to extract worker error message
export const extractWorkerErrorMessage = (data: unknown): string => {
  if (data && typeof data === "object" && "message" in data) {
    return (data as { message: unknown }).message?.toString() || UNKNOWN_MESSAGE;
  }
  if (data && typeof data === "object") {
    try {
      // Try to serialize the object to JSON for meaningful output
      return JSON.stringify(data);
    } catch {
      // If JSON.stringify fails, fall back to a descriptive message
      return "Error object (non-serializable)";
    }
  }
  if (typeof data === "string") {
    return data;
  }
  return data?.toString() || UNKNOWN_ERROR_MESSAGE;
};

// Reusable helper function for worker task execution with error handling and fallback
export const executeWithFallback = async <T, F>(
  task: () => Promise<T>,
  fallback: F,
  taskName: string
): Promise<T | F> => {
  try {
    return await task();
  } catch (error) {
    secureLog.error(
      `${taskName} failed:`,
      error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
    );
    return fallback; // Fallback to original data
  }
};
