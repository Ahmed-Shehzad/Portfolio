/**
 * Content Processing Web Worker Hooks
 *
 * These hooks handle data processing tasks for testimonials, projects,
 * and other content to improve performance by offloading work to web workers.
 */

"use client";

import { useCallback } from "react";
import { secureLog } from "@/shared/utils/logging";
import type { Project } from "@/features/portfolio/types";
import type { Testimonial } from "@/features/testimonials/types";
import { useWebWorker } from "./useWebWorker";
import { UNKNOWN_ERROR_MESSAGE } from "./constants";

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
