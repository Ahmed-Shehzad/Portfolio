/**
 * Performance Feature Exports
 */

// Types
export type {
  PerformanceMetrics,
  UseWebWorkerReturn,
  WebWorkerResponse,
  WebWorkerTask,
} from "./types";

// Constants
export { METRICS_CONFIG, PERFORMANCE_THRESHOLDS } from "./constants";

// Hooks (re-export the existing useWebWorker from hooks)
// This creates a cleaner API while maintaining backward compatibility
export { useWebWorker } from "@/hooks/webworker/useWebWorker";
