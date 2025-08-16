import { describe, it, expect } from "vitest";
import { validateEmail, MAX_EMAIL_LENGTH, SAFE_EMAIL_REGEX } from "../validation";

describe("validation utilities", () => {
  describe("validateEmail", () => {
    it("validates correct email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
        "user_name@example-domain.com",
      ];

      validEmails.forEach((email) => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
      });
    });

    it("rejects invalid email addresses", () => {
      const invalidEmails = ["", "invalid", "@example.com", "user@"];

      invalidEmails.forEach((email) => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe("Please enter a valid email address");
      });
    });

    it("trims whitespace", () => {
      const result = validateEmail("  test@example.com  ");
      expect(result.isValid).toBe(true);
    });

    it("rejects emails exceeding max length", () => {
      const longEmail = `${"a".repeat(MAX_EMAIL_LENGTH)}@example.com`;
      const result = validateEmail(longEmail);
      expect(result.isValid).toBe(false);
    });

    it("handles null and undefined input", () => {
      expect(validateEmail(null as any).isValid).toBe(false);
      expect(validateEmail(undefined as any).isValid).toBe(false);
    });
  });

  describe("SAFE_EMAIL_REGEX", () => {
    it("matches valid email patterns", () => {
      expect(SAFE_EMAIL_REGEX.test("test@example.com")).toBe(true);
      expect(SAFE_EMAIL_REGEX.test("user.name@domain.co.uk")).toBe(true);
    });

    it("rejects invalid patterns", () => {
      expect(SAFE_EMAIL_REGEX.test("invalid")).toBe(false);
      expect(SAFE_EMAIL_REGEX.test("@example.com")).toBe(false);
    });
  });

  describe("MAX_EMAIL_LENGTH", () => {
    it("is set to RFC guideline value", () => {
      expect(MAX_EMAIL_LENGTH).toBe(254);
    });
  });
});
