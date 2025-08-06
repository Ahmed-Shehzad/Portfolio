"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

interface IGlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: FC<IGlobalErrorProps> = ({ error, reset }) => {
  const router = useRouter();

  // Sanitize error message to remove sensitive information
  const sanitizeErrorMessage = (message: string | undefined): string => {
    if (!message) return "An unexpected error occurred";
    // Expanded regex to include more sensitive patterns: auth, bearer, session, email, phone
    return (
      message
        .replace(
          /\b(?:password|token|key|secret|api[_-]?key|auth|bearer|session)\b/gi,
          "[REDACTED]"
        )
        // Email addresses
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
        // Phone numbers (simple patterns, e.g., (123) 456-7890, 123-456-7890, +1 123 456 7890)
        .replace(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?){1,2}\d{3,4}/g, "[REDACTED_PHONE]")
    );
  };

  // Sanitize stack trace to remove sensitive paths and internal details
  const sanitizeErrorStack = (stack: string | undefined): string => {
    if (!stack) return "";
    return stack
      .split("\n")
      .filter(
        (line) =>
          !line.includes("node_modules") && !line.includes("webpack") && !line.includes("file://")
      )
      .join("\n");
  };

  const safeMessage = sanitizeErrorMessage(error.message);
  const safeStack = sanitizeErrorStack(error.stack);

  return (
    <html lang="en">
      <body className="bg-gray-900 font-sans text-white antialiased">
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="mb-4 text-6xl">🚨</div>
              <h1 className="mb-4 text-2xl font-bold text-red-400">Critical Error</h1>
              <p className="mb-6 text-gray-300">
                A critical error occurred that crashed the entire application. This is likely a
                serious issue that needs immediate attention.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
              >
                Reset Application
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600"
              >
                Reload Application
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-8 text-left">
                <summary className="mb-2 cursor-pointer text-red-400 hover:text-red-300">
                  Show Error Details (Development)
                </summary>
                <div className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm">
                  <div className="mb-2 font-mono text-red-400">{safeMessage}</div>
                  {error.digest && (
                    <div className="mb-2 text-xs text-gray-400">Error ID: {error.digest}</div>
                  )}
                  <pre className="text-xs whitespace-pre-wrap text-gray-300">{safeStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
