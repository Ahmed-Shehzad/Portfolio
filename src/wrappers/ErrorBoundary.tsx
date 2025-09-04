"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import type { BaseComponentProps } from "@/shared/types";
import { logger } from "@/shared/utils";

// ASCII character codes for log sanitization
const ASCII_CARRIAGE_RETURN = 13;
const ASCII_LINE_FEED = 10;
const ASCII_TAB = 9;
const ASCII_CONTROL_CHAR_MAX = 31;
const ASCII_DELETE_CHAR_MIN = 127;
const ASCII_DELETE_CHAR_MAX = 159;

interface ErrorBoundaryProps extends BaseComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * Enhanced with bulletproof architecture patterns for better error handling.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  // Sanitize log data to prevent log injection vulnerabilities
  private readonly sanitizeLog = (input: string): string => {
    const safeInput = typeof input === "string" ? input : String(input ?? "");
    return safeInput
      .split(String.fromCharCode(ASCII_CARRIAGE_RETURN))
      .join(" ") // \r
      .split(String.fromCharCode(ASCII_LINE_FEED))
      .join(" ") // \n
      .split(String.fromCharCode(ASCII_TAB))
      .join(" ") // \t
      .split("")
      .filter((char) => {
        const code = char.charCodeAt(0);
        return !(
          code <= ASCII_CONTROL_CHAR_MAX ||
          (code >= ASCII_DELETE_CHAR_MIN && code <= ASCII_DELETE_CHAR_MAX)
        );
      })
      .join("");
  };

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const safeErrorMessage = this.sanitizeLog(error.message ?? "Unknown error");
    const safeErrorStack = this.sanitizeLog(error.stack ?? "");
    const safeComponentStack = this.sanitizeLog(errorInfo.componentStack ?? "");

    // Log the sanitized error to console in development or error reporting service in production
    if (process.env.NODE_ENV === "development") {
      logger.error("ErrorBoundary caught an error", error, {
        safeMessage: safeErrorMessage,
        safeStack: safeErrorStack,
        safeComponentStack,
      });
    }

    this.setState({ error, errorInfo });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would log to an error reporting service here
    // Example: logErrorToService({ message: safeErrorMessage, stack: safeErrorStack }, { componentStack: safeComponentStack });
  }

  handleRetry = () => {
    // Reset to initial state
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      // Render custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 p-8 text-white">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="mb-4 text-6xl">⚠️</div>
              <h1 className="mb-4 text-2xl font-bold text-emerald-400">
                Oops! Something went wrong
              </h1>
              <p className="mb-6 text-gray-300">
                We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full cursor-pointer rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Try Again
              </button>

              <button
                onClick={() => {
                  try {
                    window.location.reload();
                  } catch {
                    window.location.replace(window.location.href);
                  }
                }}
                className="w-full cursor-pointer rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600"
              >
                Reload Page
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="mb-2 cursor-pointer text-red-400 hover:text-red-300">
                  Show Error Details (Development)
                </summary>
                <div className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm">
                  <div className="mb-2 font-mono text-red-400">{this.state.error.toString()}</div>
                  {this.state.errorInfo && (
                    <pre className="overflow-auto text-xs whitespace-pre-wrap text-gray-300">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
