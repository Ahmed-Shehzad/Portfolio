import { describe, it, expect } from "vitest";
import { validateField, validateContactForm, sanitizeFormData } from "../utils";

describe("contact utils", () => {
  describe("validateField", () => {
    it("validates required fields", () => {
      expect(validateField("name", "")).toBe("Name is required");
      expect(validateField("name", "John")).toBeUndefined();
    });

    it("validates minimum length", () => {
      expect(validateField("name", "A")).toBe("Name must be at least 2 characters");
      expect(validateField("subject", "Hi")).toBe("Subject must be at least 3 characters");
    });

    it("validates email format", () => {
      expect(validateField("email", "invalid")).toBe("Please enter a valid email address");
      expect(validateField("email", "test@example.com")).toBeUndefined();
    });

    it("validates email length", () => {
      const longEmail = `${"a".repeat(300)}@example.com`;
      expect(validateField("email", longEmail)).toBe("Email address is too long");
    });
  });

  describe("validateContactForm", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "This is a test message with enough characters",
    };

    it("validates valid form data", () => {
      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("returns errors for invalid data", () => {
      const invalidData = {
        name: "",
        email: "invalid",
        subject: "",
        message: "short",
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.subject).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });
  });

  describe("sanitizeFormData", () => {
    it("trims whitespace", () => {
      const data = {
        name: "  John Doe  ",
        email: "  JOHN@EXAMPLE.COM  ",
        subject: "  Test Subject  ",
        message: "  Test message  ",
      };

      const result = sanitizeFormData(data);
      expect(result.name).toBe("John Doe");
      expect(result.email).toBe("john@example.com");
      expect(result.subject).toBe("Test Subject");
      expect(result.message).toBe("Test message");
    });

    it("limits field lengths", () => {
      const data = {
        name: "a".repeat(200),
        email: "test@example.com",
        subject: "b".repeat(300),
        message: "c".repeat(3000),
      };

      const result = sanitizeFormData(data);
      expect(result.name.length).toBe(100);
      expect(result.subject.length).toBe(200);
      expect(result.message.length).toBe(2000);
    });

    it("converts email to lowercase", () => {
      const data = {
        name: "John",
        email: "JOHN@EXAMPLE.COM",
        subject: "Test",
        message: "Test message",
      };

      const result = sanitizeFormData(data);
      expect(result.email).toBe("john@example.com");
    });
  });
});
