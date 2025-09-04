/**
 * Feature Error Boundary
 *
 * Specialized error boundary for feature components.
 */

"use client";

import { ErrorBoundary } from "./ErrorBoundary";
import { logger } from "@/shared/utils";
import type { ReactNode } from "react";

interface FeatureErrorBoundaryProps {
  children: ReactNode;
  featureName: string;
}

export const FeatureErrorBoundary = ({ children, featureName }: FeatureErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      onError={(error) => {
        logger.error(`Error in ${featureName} feature`, error);
      }}
      fallback={
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-yellow-800">
              {featureName} feature temporarily unavailable
            </h2>
            <p className="text-sm text-yellow-600">
              This section is experiencing technical difficulties. Please try again later.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};
