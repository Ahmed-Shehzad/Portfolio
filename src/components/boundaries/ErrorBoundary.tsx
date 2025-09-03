/**
 *"use client";

import { Component, type ErrorInfo, type ReactNode } from "react"; Boundary Components
 *
 * Following bulletproof architecture pattern for comprehensive error handling.
 */

"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { componentLogger } from "@/shared/utils";

const errorLogger = componentLogger("ErrorBoundary");

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | undefined;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error using production-safe logger
    errorLogger.error("Error caught by boundary", error, {
      componentStack: errorInfo.componentStack,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-red-800">Something went wrong</h2>
            <p className="text-sm text-red-600">
              {process.env.NODE_ENV === "development"
                ? this.state.error?.message
                : "Please try refreshing the page"}
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
