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

interface WorkerTask {
  id: string;
  type: string;
  data: any;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}

interface WorkerResponse {
  type: string;
  data: any;
  id?: string;
  processingTime?: number;
}

export const useWebWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const tasksRef = useRef<Map<string, WorkerTask>>(new Map());
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

          if (id && tasksRef.current.has(id)) {
            const task = tasksRef.current.get(id)!;
            tasksRef.current.delete(id);

            if (type === "ERROR") {
              task.reject(new Error(data));
            } else {
              task.resolve({ data, processingTime });
            }

            // Update processing state
            setIsProcessing(tasksRef.current.size > 0);
          }

          // Handle global messages
          switch (type) {
            case "WORKER_READY":
              console.log("Web Worker ready for tasks");
              break;

            case "PERFORMANCE_STATS":
              setStats(data);
              break;

            case "WORKER_HEALTH_CHECK":
              // Optional: Handle worker health monitoring
              break;

            case "WORKER_ERROR":
              console.error("Worker error:", data);
              setError(data.message);
              break;
          }
        };

        workerRef.current.onerror = (error) => {
          console.error("Worker initialization error:", error);
          setError("Failed to initialize web worker");
        };
      } catch (error) {
        console.warn("Web Worker not available:", error);
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
    async (type: string, data: any): Promise<{ data: any; processingTime?: number }> => {
      if (!workerRef.current) {
        throw new Error("Web Worker not available");
      }

      const id = `task_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

      return new Promise((resolve, reject) => {
        tasksRef.current.set(id, { id, type, data, resolve, reject });
        setIsProcessing(true);
        setError(null);

        workerRef.current!.postMessage({ type, data, id });

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
    async (elements: any[], scrollProgress: number) => {
      try {
        const result = await executeTask("PROCESS_ANIMATIONS", {
          elements,
          scrollProgress,
          viewport: { width: window.innerWidth, height: window.innerHeight },
        });
        return result.data;
      } catch (error) {
        console.error("Animation processing failed:", error);
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
    async (scrollY: number, elements: any[]) => {
      try {
        const result = await executeTask("OPTIMIZE_SCROLL_CALCULATIONS", {
          scrollY,
          windowHeight: window.innerHeight,
          elements,
        });
        return result.data;
      } catch (error) {
        console.error("Scroll optimization failed:", error);
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
    async (testimonials: any[]) => {
      try {
        const result = await executeTask("PROCESS_TESTIMONIALS", { testimonials });
        return result.data;
      } catch (error) {
        console.error("Testimonials processing failed:", error);
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
    async (projects: any[]) => {
      try {
        const result = await executeTask("OPTIMIZE_PROJECT_DATA", { projects });
        return result.data;
      } catch (error) {
        console.error("Projects optimization failed:", error);
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
        console.error("Star ratings calculation failed:", error);
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
        console.error("Form validation failed:", error);
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
      console.error("Performance metrics calculation failed:", error);
      return null;
    }
  }, [executeTask]);

  return { calculateMetrics };
};
