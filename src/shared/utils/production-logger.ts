/**
 * Production-Safe Logging Utility
 *
 * Centralized logging that respects environment settings and
 * provides structured logging for better debugging and monitoring.
 */

// Disable console lint for this file as we're creating a controlled logging system
/* eslint-disable no-console */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  component?: string;
  feature?: string;
  userId?: string;
  timestamp?: string;
  [key: string]: unknown;
}

// Declare gtag global type for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

class Logger {
  private readonly isDevelopment = process.env.NODE_ENV === "development";
  private readonly isTest = process.env.NODE_ENV === "test";

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    // Don't log anything in test environment unless explicitly enabled
    if (this.isTest) {
      return process.env["ENABLE_TEST_LOGGING"] === "true";
    }

    // In production, only log warnings and errors
    if (!this.isDevelopment) {
      return level === "warn" || level === "error";
    }

    // In development, log everything
    return true;
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog("info")) {
      const formattedMessage = this.formatMessage("info", message, context);
      console.log(formattedMessage);
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog("warn")) {
      const formattedMessage = this.formatMessage("warn", message, context);
      console.warn(formattedMessage);
    }

    // In production, send to error tracking service
    if (!this.isDevelopment) {
      this.sendToErrorService("warn", message, context);
    }
  }

  error(message: string, error?: Error, context?: LogContext): void {
    if (this.shouldLog("error")) {
      const errorContext = error
        ? {
            ...context,
            error: {
              message: error.message,
              stack: this.isDevelopment ? error.stack : undefined,
              name: error.name,
            },
          }
        : context;

      const formattedMessage = this.formatMessage("error", message, errorContext);
      console.error(formattedMessage);
    }

    // In production, always send errors to monitoring service
    if (!this.isDevelopment) {
      this.sendToErrorService("error", message, { ...context, error });
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment && this.shouldLog("debug")) {
      const formattedMessage = this.formatMessage("debug", message, context);
      console.debug(formattedMessage);
    }
  }

  // Method for creating component-specific loggers
  createComponentLogger(componentName: string) {
    return {
      info: (message: string, context?: LogContext) =>
        this.info(message, { ...context, component: componentName }),
      warn: (message: string, context?: LogContext) =>
        this.warn(message, { ...context, component: componentName }),
      error: (message: string, error?: Error, context?: LogContext) =>
        this.error(message, error, { ...context, component: componentName }),
      debug: (message: string, context?: LogContext) =>
        this.debug(message, { ...context, component: componentName }),
    };
  }

  // Method for creating feature-specific loggers
  createFeatureLogger(featureName: string) {
    return {
      info: (message: string, context?: LogContext) =>
        this.info(message, { ...context, feature: featureName }),
      warn: (message: string, context?: LogContext) =>
        this.warn(message, { ...context, feature: featureName }),
      error: (message: string, error?: Error, context?: LogContext) =>
        this.error(message, error, { ...context, feature: featureName }),
      debug: (message: string, context?: LogContext) =>
        this.debug(message, { ...context, feature: featureName }),
    };
  }

  private sendToErrorService(level: string, message: string, _context?: LogContext): void {
    // In production, send to error monitoring services like:
    // - Sentry: Sentry.captureException()
    // - LogRocket: LogRocket.captureException()
    // - DataDog: datadogLogs.logger.error()

    // Example placeholder for Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: `${level}: ${message}`,
        fatal: level === "error",
      });
    }
  }
}

// Create singleton instance
export const logger = new Logger();

// Export component and feature logger creators
export const componentLogger = (name: string) => logger.createComponentLogger(name);
export const featureLogger = (name: string) => logger.createFeatureLogger(name);

// Export main logger instance and methods
export const productionLogger = logger;
