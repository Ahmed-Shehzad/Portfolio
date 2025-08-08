// Error handling type definitions

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  retry?: () => void;
}
