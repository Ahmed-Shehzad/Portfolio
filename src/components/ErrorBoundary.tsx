"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): IState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  // Sanitize log data to prevent log injection vulnerabilities
  private readonly sanitizeLog = (input: string): string => {
    const safeInput = typeof input === "string" ? input : String(input ?? "");
    return safeInput
      .split(String.fromCharCode(13))
      .join(" ") // \r
      .split(String.fromCharCode(10))
      .join(" ") // \n
      .split(String.fromCharCode(9))
      .join(" ") // \t
      .split("")
      .filter((char) => {
        const code = char.charCodeAt(0);
        return !(code <= 31 || (code >= 127 && code <= 159));
      })
      .join("");
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const safeErrorMessage = this.sanitizeLog(error.message || "Unknown error");
    const safeErrorStack = this.sanitizeLog(error.stack || "");
    const safeComponentStack = this.sanitizeLog(errorInfo.componentStack || "");

    // Log the sanitized error to console or error reporting service
    console.error("ErrorBoundary caught an error:", safeErrorMessage);
    console.error("Error stack:", safeErrorStack);
    console.error("Component stack:", safeComponentStack);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService({ message: safeErrorMessage, stack: safeErrorStack }, { componentStack: safeComponentStack });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
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
                className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600"
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
                    <pre className="text-xs whitespace-pre-wrap text-gray-300">
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
