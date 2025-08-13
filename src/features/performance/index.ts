/**
 * Performance Feature Exports
 */

// Types
export type {
  PerformanceMetrics,
  WebWorkerTask,
  WebWorkerResponse,
  UseWebWorkerReturn,
} from "./types";

// Constants
export { WORKER_TASK_TIMEOUT_MS, PERFORMANCE_THRESHOLDS, WORKER_TASKS } from "./constants";

// Hooks (re-export the existing useWebWorker from hooks)
// This creates a cleaner API while maintaining backward compatibility
export { useWebWorker } from "@/hooks/useWebWorker";
