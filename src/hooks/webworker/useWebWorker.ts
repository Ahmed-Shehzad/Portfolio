/**
 * Core Web Worker Hook for Portfolio Performance Optimization
 *
 * This hook provides an easy way to use the web worker for heavy computations
 * and helps improve Core Web Vitals by moving work off the main thread.
 *
 * Usage:
 * ```tsx
 * import { useWebWorker } from '@/hooks/webworker/useWebWorker';
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
import { WORKER_TASK_TIMEOUT_MS, UNKNOWN_ERROR_MESSAGE } from "./constants";
import { extractErrorMessage, extractWorkerErrorMessage } from "./utils";
import type { WorkerTask, WorkerResponse, WorkerStats } from "./types";

export const useWebWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const tasksRef = useRef<Map<string, WorkerTask>>(new Map());
  const idCounterRef = useRef(0); // fallback incremental counter
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WorkerStats>({
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
                setStats(data as WorkerStats);
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
