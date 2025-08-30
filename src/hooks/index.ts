// Hooks barrel exports
export {
  useBfcacheCompatibleTimeout,
  useBfcacheCompatibleScrollListener,
} from "./useBfcacheCompatible";
export { useScrollAnimation } from "./useScrollAnimation";

// Web Worker hooks - imported from the new modular structure
export {
  useWebWorker,
  useAnimationWorker,
  useScrollWorker,
  useTestimonialsWorker,
  useProjectsWorker,
  useStarRatingsWorker,
  useContactValidationWorker,
  usePerformanceWorker,
} from "./webworker";

// Alias for backward compatibility
export { useBfcacheCompatibleTimeout as useBfcacheCompatible } from "./useBfcacheCompatible";
