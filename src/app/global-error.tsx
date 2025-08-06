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

    let sanitized = message;

    // Remove sensitive keywords
    sanitized = sanitized.replace(
      /\b(?:password|token|key|secret|api[_-]?key|auth|bearer|session|jwt|refresh[_-]?token)\b/gi,
      "[REDACTED]"
    );

    // Enhanced email detection - covers most practical cases
    // Standard format: user@domain.tld
    sanitized = sanitized.replace(
      /\b[A-Za-z\d][\w.-]*[A-Za-z\d]@[A-Za-z\d][\w.-]*\.[A-Za-z]{2,}\b/g,
      "[REDACTED_EMAIL]"
    );

    // Quoted email format: "user name"@domain.tld
    sanitized = sanitized.replace(
      /"[^"]+"\s*@\s*[A-Za-z\d][\w.-]*\.[A-Za-z]{2,}\b/g,
      "[REDACTED_EMAIL]"
    );

    // Simplified phone patterns - multiple passes for different formats
    // International format: +1 234 567 8900
    sanitized = sanitized.replace(
      /\+\d{1,3}[\s.-]?\d{3,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g,
      "[REDACTED_PHONE]"
    );

    // US format: (123) 456-7890
    sanitized = sanitized.replace(/\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}/g, "[REDACTED_PHONE]");

    // Simple format: 123-456-7890 or 123.456.7890
    sanitized = sanitized.replace(/\d{3}[\s.-]\d{3}[\s.-]\d{4}/g, "[REDACTED_PHONE]");

    // Extension format: 1234 ext 567
    sanitized = sanitized.replace(/\d{4,}\s+(?:ext|extension|x)\s+\d{1,5}/gi, "[REDACTED_PHONE]");

    // Credit card numbers (13-19 digits with separators)
    sanitized = sanitized.replace(
      /\b\d{4}[\s.-]?\d{4}[\s.-]?\d{4}[\s.-]?\d{1,4}\b/g,
      "[REDACTED_CARD]"
    );

    // Social Security Numbers (US format: XXX-XX-XXXX)
    sanitized = sanitized.replace(/\b\d{3}[\s.-]?\d{2}[\s.-]?\d{4}\b/g, "[REDACTED_SSN]");

    // URLs with sensitive query parameters
    sanitized = sanitized.replace(
      /https?:\/\/[^\s]+[?&](?:token|key|password|auth|secret|jwt)=[^&\s]*/gi,
      "[REDACTED_URL]"
    );

    return sanitized;
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
