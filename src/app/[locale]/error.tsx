"use client";

import { FC, useEffect } from "react";
import { logger } from "@/shared/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * AppError component for the main page
 * This will show when there are runtime errors in the app
 */
const AppError: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error("Application error", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong!</h2>
        <p className="mb-6 text-white/60">
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="block w-full px-6 py-3 text-center text-emerald-600 transition-colors hover:text-emerald-500"
          >
            Go to homepage
          </button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-white/60">Error details</summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-800 p-4 text-sm text-red-400">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default AppError;
