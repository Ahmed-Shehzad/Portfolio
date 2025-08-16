import { describe, it, expect, vi } from "vitest";
import { sanitizeLogInput, sanitizeLogObject, secureLog } from "../logging";

describe("logging utilities", () => {
  describe("sanitizeLogInput", () => {
    it("handles null and undefined", () => {
      expect(sanitizeLogInput(null)).toBe("null");
      expect(sanitizeLogInput(undefined)).toBe("null");
    });

    it("removes control characters", () => {
      expect(sanitizeLogInput("test\r\nstring")).toBe("test  string");
      expect(sanitizeLogInput("test\tstring")).toBe("test string");
    });

    it("limits string length", () => {
      const longString = "a".repeat(2000);
      const result = sanitizeLogInput(longString);
      expect(result.length).toBe(1000);
    });

    it("converts non-strings to strings", () => {
      expect(sanitizeLogInput(123)).toBe("123");
      expect(sanitizeLogInput(true)).toBe("true");
    });
  });

  describe("sanitizeLogObject", () => {
    it("sanitizes all object values", () => {
      const input = {
        key1: "value\r\n1",
        key2: "value\t2",
      };

      const result = sanitizeLogObject(input);
      expect(result.key1).toBe("value  1");
      expect(result.key2).toBe("value 2");
    });

    it("handles various data types", () => {
      const input = {
        string: "test\nstring",
        number: 123,
        boolean: true,
        nullValue: null,
        undefinedValue: undefined,
      };

      const result = sanitizeLogObject(input);
      expect(result.string).toBe("test string");
      expect(result.number).toBe("123");
      expect(result.boolean).toBe("true");
      expect(result.nullValue).toBe("null");
      expect(result.undefinedValue).toBe("null");
    });
  });

  describe("secureLog", () => {
    it("logs info messages", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      secureLog.info("test message", "arg1");

      expect(consoleSpy).toHaveBeenCalledWith("[INFO] test message", "arg1");
      consoleSpy.mockRestore();
    });

    it("logs error messages", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      secureLog.error("error message");

      expect(consoleSpy).toHaveBeenCalledWith("[ERROR] error message");
      consoleSpy.mockRestore();
    });

    it("logs warn messages", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      secureLog.warn("warn message", "arg1");

      expect(consoleSpy).toHaveBeenCalledWith("[WARN] warn message", "arg1");
      consoleSpy.mockRestore();
    });

    it("logs debug messages in development", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

      secureLog.debug("debug message");

      expect(consoleSpy).toHaveBeenCalledWith("[DEBUG] debug message");
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it("skips debug messages in production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";
      const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

      secureLog.debug("debug message");

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });
});
