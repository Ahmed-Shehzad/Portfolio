/**
 * Specialized Web Worker Hooks
 *
 * These hooks handle specialized functionality like form validation
 * and performance metrics calculation using web workers.
 */

"use client";

import { useCallback } from "react";
import { secureLog } from "@/shared/utils/logging";
import { useWebWorker } from "./useWebWorker";
import { UNKNOWN_ERROR_MESSAGE } from "./constants";

export const useContactValidationWorker = () => {
  const { executeTask } = useWebWorker();

  const validateForm = useCallback(
    async (fields: Record<string, string>) => {
      try {
        const result = await executeTask("PROCESS_CONTACT_VALIDATION", { fields });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Form validation failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        // Fallback validation
        return {
          validation: Object.fromEntries(
            Object.keys(fields).map((field) => [field, { isValid: true, message: "" }])
          ),
          isFormValid: true,
        };
      }
    },
    [executeTask]
  );

  return { validateForm };
};

export const usePerformanceWorker = () => {
  const { executeTask } = useWebWorker();

  const calculateMetrics = useCallback(async () => {
    if (typeof window === "undefined") return null;

    try {
      const navigationTiming = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      const paintTiming = performance.getEntriesByType("paint");
      const resourceTiming = performance.getEntriesByType("resource");

      const result = await executeTask("CALCULATE_PERFORMANCE_METRICS", {
        navigationTiming,
        paintTiming: Object.fromEntries(paintTiming.map((entry) => [entry.name, entry.startTime])),
        resourceTiming,
      });

      return result.data;
    } catch (error) {
      secureLog.error(
        "Performance metrics calculation failed:",
        error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
      );
      return null;
    }
  }, [executeTask]);

  return { calculateMetrics };
};
