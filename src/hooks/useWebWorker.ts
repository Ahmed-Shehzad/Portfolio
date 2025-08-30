/**
 * Web Worker Hook for Portfolio Performance Optimization
 *
 * This hook provides an easy way to use the web worker for heavy computations
 * and helps improve Core Web Vitals by moving work off the main thread.
 *
 * Usage:
 * ```tsx
 * import { useWebWorker } from '@/hooks/useWebWorker';
 *
 * const MyComponent = () => {
 *   const { executeTask, isProcessing, error } = useWebWorker();
 *
 *   const handleHeavyTask = async () => {
 *     try {
 *       const result = await executeTask('PROCESS_ANIMATIONS', animationData);
 *       setAnimations(result.data);
 *     } catch (error) {
 *       console.error('Task failed:', error);
 *     }
 *   };
 * };
 * ```
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { secureLog } from "@/shared/utils/logging";

// Web Worker configuration constants
const WORKER_TASK_TIMEOUT_MS = 30000; // 30 seconds timeout for tasks
const UNKNOWN_ERROR_MESSAGE = "Unknown error";

// Helper function to extract error message from unknown data
const extractErrorMessage = (data: unknown): string => {
  if (typeof data === "string") {
    return data;
  }
  if (data && typeof data === "object" && "toString" in data) {
    return data.toString();
  }
  return "[object]";
};

// Helper function to extract worker error message
const extractWorkerErrorMessage = (data: unknown): string => {
  if (data && typeof data === "object" && "message" in data) {
    return (data as { message: unknown }).message?.toString() || "Unknown message";
  }
  if (data && typeof data === "object" && "toString" in data) {
    return data.toString();
  }
  return "[object]";
};

import type { Project } from "@/features/projects/types";
import type { Testimonial } from "@/features/testimonials/types";
import type { SectionElement } from "@/features/navigation/types";

interface WorkerTask {
  id: string;
  type: string;
  data: unknown;
  resolve: (value: { data: unknown; processingTime?: number | undefined }) => void;
  reject: (reason: Error) => void;
}

interface WorkerResponse<TData = unknown> {
  type: string;
  data: TData;
  id?: string;
  processingTime?: number;
}

export const useWebWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const tasksRef = useRef<Map<string, WorkerTask>>(new Map());
  const idCounterRef = useRef(0); // fallback incremental counter
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    averageTaskTime: 0,
    totalProcessingTime: 0,
  });

  // Initialize worker
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        workerRef.current = new Worker("/worker.js");

        workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
          const { type, data, id, processingTime } = e.data;

          // Handle task responses
          if (id && tasksRef.current.has(id)) {
            handleWorkerTaskResponse(type, data, id, processingTime);
          }

          // Handle global messages
          handleWorkerGlobalMessage(type, data);
        };

        // Helper: handle task responses
        function handleWorkerTaskResponse(
          type: string,
          data: unknown,
          id: string,
          processingTime?: number
        ) {
          const task = tasksRef.current.get(id);
          if (!task) {
            secureLog.error("Task not found for ID:", id);
            return;
          }
          tasksRef.current.delete(id);
          if (type === "ERROR") {
            const errorMessage = extractErrorMessage(data);
            task.reject(new Error(errorMessage));
          } else {
            task.resolve({
              data,
              processingTime: processingTime ?? undefined,
            });
          }
          setIsProcessing(tasksRef.current.size > 0);
        }

        // Helper: handle global messages
        function handleWorkerGlobalMessage(type: string, data: unknown) {
          switch (type) {
            case "WORKER_READY":
              break;
            case "PERFORMANCE_STATS":
              if (
                data &&
                typeof data === "object" &&
                "tasksCompleted" in data &&
                "averageTaskTime" in data &&
                "totalProcessingTime" in data
              ) {
                setStats(
                  data as {
                    tasksCompleted: number;
                    averageTaskTime: number;
                    totalProcessingTime: number;
                  }
                );
              }
              break;
            case "WORKER_HEALTH_CHECK":
              break;
            case "WORKER_ERROR": {
              secureLog.error(
                "Worker error:",
                typeof data === "string" ? data : "Unknown worker error"
              );
              const errorMessage = extractWorkerErrorMessage(data);
              setError(errorMessage);
              break;
            }
          }
        }

        workerRef.current.onerror = (error) => {
          secureLog.error(
            "Worker initialization error:",
            error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
          );
          setError("Failed to initialize web worker");
        };
      } catch (error) {
        secureLog.warn(
          "Web Worker not available:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        setError("Web Worker not supported in this environment");
      }
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Execute task in web worker
  const executeTask = useCallback(
    async <TData = unknown, TResult = unknown>(
      type: string,
      data: TData
    ): Promise<{ data: TResult; processingTime?: number }> => {
      if (!workerRef.current) {
        throw new Error("Web Worker not available");
      }

      // Use cryptographically strong UUID where available to avoid predictable / colliding IDs.
      // Fallback: time component + incrementing counter (no Math.random usage to ensure determinism under tests).
      const id = (() => {
        try {
          if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
            return `task_${crypto.randomUUID()}`;
          }
        } catch {
          // crypto.randomUUID not available – fallback path below
        }
        idCounterRef.current += 1;
        return `task_${Date.now().toString(36)}_${idCounterRef.current.toString(36)}`;
      })();

      return new Promise((resolve, reject) => {
        tasksRef.current.set(id, {
          id,
          type,
          data,
          resolve: resolve as (value: {
            data: unknown;
            processingTime?: number | undefined;
          }) => void,
          reject,
        });
        setIsProcessing(true);
        setError(null);

        if (workerRef.current) {
          workerRef.current.postMessage({ type, data, id });
        } else {
          reject(new Error("Web Worker not available"));
          return;
        }

        // Set timeout to prevent hanging
        setTimeout(() => {
          if (tasksRef.current.has(id)) {
            tasksRef.current.delete(id);
            setIsProcessing(tasksRef.current.size > 0);
            reject(new Error("Task timeout"));
          }
        }, WORKER_TASK_TIMEOUT_MS);
      });
    },
    []
  );

  // Clear worker cache
  const clearCache = useCallback(async () => {
    if (workerRef.current) {
      await executeTask("CLEAR_CACHE", {});
    }
  }, [executeTask]);

  // Get performance stats
  const getStats = useCallback(async () => {
    if (workerRef.current) {
      await executeTask("GET_PERFORMANCE_STATS", {});
    }
  }, [executeTask]);

  return {
    executeTask,
    isProcessing,
    error,
    stats,
    clearCache,
    getStats,
    isWorkerAvailable: !!workerRef.current,
  };
};

// Specific hooks for common tasks
export const useAnimationWorker = () => {
  const { executeTask, isProcessing } = useWebWorker();

  const processAnimations = useCallback(
    async (elements: SectionElement[], scrollProgress: number) => {
      try {
        const result = await executeTask("PROCESS_ANIMATIONS", {
          elements,
          scrollProgress,
          viewport: { width: window.innerWidth, height: window.innerHeight },
        });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Animation processing failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        return elements; // Fallback to original data
      }
    },
    [executeTask]
  );

  return { processAnimations, isProcessing };
};

export const useScrollWorker = () => {
  const { executeTask } = useWebWorker();

  const optimizeScrollCalculations = useCallback(
    async (scrollY: number, elements: SectionElement[]) => {
      try {
        const result = await executeTask("OPTIMIZE_SCROLL_CALCULATIONS", {
          scrollY,
          windowHeight: window.innerHeight,
          elements,
        });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Scroll optimization failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        return elements;
      }
    },
    [executeTask]
  );

  return { optimizeScrollCalculations };
};

export const useTestimonialsWorker = () => {
  const { executeTask, isProcessing } = useWebWorker();

  const processTestimonials = useCallback(
    async (testimonials: Testimonial[]) => {
      try {
        const result = await executeTask("PROCESS_TESTIMONIALS", { testimonials });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Testimonials processing failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        return testimonials;
      }
    },
    [executeTask]
  );

  return { processTestimonials, isProcessing };
};

export const useProjectsWorker = () => {
  const { executeTask, isProcessing } = useWebWorker();

  const optimizeProjects = useCallback(
    async (projects: Project[]) => {
      try {
        const result = await executeTask("OPTIMIZE_PROJECT_DATA", { projects });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Projects optimization failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        return projects;
      }
    },
    [executeTask]
  );

  return { optimizeProjects, isProcessing };
};

export const useStarRatingsWorker = () => {
  const { executeTask } = useWebWorker();

  const calculateStarRatings = useCallback(
    async (ratings: Array<{ rating: number; id: string }>) => {
      try {
        const result = await executeTask("CALCULATE_STAR_RATINGS", { ratings });
        return result.data;
      } catch (error) {
        secureLog.error(
          "Star ratings calculation failed:",
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
        return ratings.map(({ rating, id }) => ({
          id,
          rating,
          stars: Array.from({ length: 5 }, (_, index) => ({
            filled: index < Math.floor(rating),
            index,
            key: `star-${id}-${index}`,
          })),
        }));
      }
    },
    [executeTask]
  );

  return { calculateStarRatings };
};

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
