"use client";

import { useEffect, FC } from "react";
import { useRouter } from "next/navigation";

interface IErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<IErrorPageProps> = ({ error, reset }) => {
  const router = useRouter();

  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="mb-4 text-6xl">💥</div>
          <h1 className="mb-4 text-2xl font-bold text-emerald-400">Application Error</h1>
          <p className="mb-6 text-gray-300">
            Something went wrong while loading the application. Please try again.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600"
          >
            Go Home
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="mb-2 cursor-pointer text-red-400 hover:text-red-300">
              Show Error Details (Development)
            </summary>
            <div className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm">
              <div className="mb-2 font-mono text-red-400">{error.message}</div>
              {error.digest && (
                <div className="mb-2 text-xs text-gray-400">Error ID: {error.digest}</div>
              )}
              <pre className="text-xs whitespace-pre-wrap text-gray-300 overflow-x-auto">{error.stack}</pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
