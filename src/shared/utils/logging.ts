/**
 * Secure Logging Utilities
 *
 * Provides sanitized logging functions to prevent log injection attacks.
 * All user input should be sanitized before logging to prevent log forging.
 */

/**
 * Sanitizes input to prevent log injection attacks
 * Removes control characters, newlines, and other potentially dangerous characters
 */
export const sanitizeLogInput = (input: unknown): string => {
  if (input === null || input === undefined) {
    return "null";
  }

  let stringInput: string;

  if (typeof input === "string") {
    stringInput = input;
  } else if (typeof input === "object") {
    try {
      // Try to serialize the object to JSON for meaningful output
      stringInput = JSON.stringify(input);
    } catch {
      // If JSON.stringify fails (circular references, etc.), fall back to a descriptive message
      stringInput = "[object (non-serializable)]";
    }
  } else {
    // For primitives like numbers, booleans, etc.
    stringInput = String(input);
  }

  return (
    stringInput
      // Remove carriage returns and newlines
      .replace(/\r/g, " ")
      .replace(/\n/g, " ")
      // Remove tabs
      .replace(/\t/g, " ")
      // Remove other control characters using String.fromCharCode approach
      .replace(
        new RegExp(
          `[${String.fromCharCode(0)}-${String.fromCharCode(31)}${String.fromCharCode(127)}-${String.fromCharCode(159)}]`,
          "g"
        ),
        ""
      )
      // Limit length to prevent log flooding
      .slice(0, 1000)
      // Trim whitespace
      .trim()
  );
};

/**
 * Sanitizes an object for logging by sanitizing all string values
 */
export const sanitizeLogObject = (obj: Record<string, unknown>): Record<string, string> => {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = sanitizeLogInput(key);
    sanitized[sanitizedKey] = sanitizeLogInput(value);
  }

  return sanitized;
};

/**
 * Secure console.log wrapper
 */
export const secureLog = {
  info: (message: string, ...args: unknown[]) => {
    const sanitizedMessage = sanitizeLogInput(message);
    const sanitizedArgs = args.map(sanitizeLogInput);
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${sanitizedMessage}`, ...sanitizedArgs);
  },

  warn: (message: string, ...args: unknown[]) => {
    const sanitizedMessage = sanitizeLogInput(message);
    const sanitizedArgs = args.map(sanitizeLogInput);
    console.warn(`[WARN] ${sanitizedMessage}`, ...sanitizedArgs);
  },

  error: (message: string, ...args: unknown[]) => {
    const sanitizedMessage = sanitizeLogInput(message);
    const sanitizedArgs = args.map(sanitizeLogInput);
    console.error(`[ERROR] ${sanitizedMessage}`, ...sanitizedArgs);
  },

  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      const sanitizedMessage = sanitizeLogInput(message);
      const sanitizedArgs = args.map(sanitizeLogInput);
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${sanitizedMessage}`, ...sanitizedArgs);
    }
  },
};
