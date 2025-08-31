/**
 * Animation and Scroll Web Worker Hooks
 *
 * These hooks handle UI interaction-related web worker tasks like animations
 * and scroll optimizations to improve performance and user experience.
 */

"use client";

import { useCallback } from "react";
import type { SectionElement } from "@/features/navigation/types";
import { useWebWorker } from "./useWebWorker";
import { executeWithFallback } from "./utils";

export const useAnimationWorker = () => {
  const { executeTask, isProcessing } = useWebWorker();

  const processAnimations = useCallback(
    async (elements: SectionElement[], scrollProgress: number) => {
      if (typeof window === "undefined") return elements;

      return await executeWithFallback(
        async () => {
          const result = await executeTask("PROCESS_ANIMATIONS", {
            elements,
            scrollProgress,
            viewport: { width: window.innerWidth, height: window.innerHeight },
          });
          return result.data;
        },
        elements,
        "Animation processing"
      );
    },
    [executeTask]
  );

  return { processAnimations, isProcessing };
};

export const useScrollWorker = () => {
  const { executeTask } = useWebWorker();

  const optimizeScrollCalculations = useCallback(
    async (scrollY: number, elements: SectionElement[]) => {
      if (typeof window === "undefined") return elements;

      return await executeWithFallback(
        async () => {
          const result = await executeTask("OPTIMIZE_SCROLL_CALCULATIONS", {
            scrollY,
            windowHeight: window.innerHeight,
            elements,
          });
          return result.data;
        },
        elements,
        "Scroll optimization"
      );
    },
    [executeTask]
  );

  return { optimizeScrollCalculations };
};
