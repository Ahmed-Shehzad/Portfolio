/**
 * Web Worker Hooks - Main Export File
 *
 * This file provides clean imports for all web worker related hooks and utilities.
 * Import from here to maintain consistency and ease of refactoring.
 */

// Core hook
export { useWebWorker } from "./useWebWorker";

// Animation and scroll hooks
export { useAnimationWorker, useScrollWorker } from "./useAnimationWorker";

// Content processing hooks
export { useTestimonialsWorker, useProjectsWorker, useStarRatingsWorker } from "./useContentWorker";

// Specialized functionality hooks
export { useContactValidationWorker, usePerformanceWorker } from "./useSpecializedWorker";

// Types and utilities (for advanced use cases)
export type { WorkerTask, WorkerResponse, WorkerStats } from "./types";
export { executeWithFallback } from "./utils";
export { WORKER_TASK_TIMEOUT_MS } from "./constants";
