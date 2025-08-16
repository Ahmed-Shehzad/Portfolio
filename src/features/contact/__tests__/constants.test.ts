import { describe, it, expect } from "vitest";
import {
  SAFE_EMAIL_REGEX,
  VALIDATION_RULES,
  INITIAL_FORM_DATA,
  FORM_FIELD_LABELS,
  FORM_PLACEHOLDERS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from "../constants";

describe("contact constants", () => {
  describe("SAFE_EMAIL_REGEX", () => {
    it("matches valid emails", () => {
      expect(SAFE_EMAIL_REGEX.test("test@example.com")).toBe(true);
      expect(SAFE_EMAIL_REGEX.test("user.name@domain.co.uk")).toBe(true);
    });

    it("rejects invalid emails", () => {
      expect(SAFE_EMAIL_REGEX.test("invalid")).toBe(false);
      expect(SAFE_EMAIL_REGEX.test("@example.com")).toBe(false);
    });
  });

  describe("VALIDATION_RULES", () => {
    it("has rules for all form fields", () => {
      expect(VALIDATION_RULES).toHaveProperty("name");
      expect(VALIDATION_RULES).toHaveProperty("email");
      expect(VALIDATION_RULES).toHaveProperty("subject");
      expect(VALIDATION_RULES).toHaveProperty("message");
    });

    it("has correct name validation", () => {
      expect(VALIDATION_RULES.name.minLength).toBe(2);
      expect(VALIDATION_RULES.name.required).toBe(true);
    });

    it("has correct email validation", () => {
      expect(VALIDATION_RULES.email.pattern).toBe(SAFE_EMAIL_REGEX);
      expect(VALIDATION_RULES.email.required).toBe(true);
    });
  });

  describe("INITIAL_FORM_DATA", () => {
    it("has empty strings for all fields", () => {
      expect(INITIAL_FORM_DATA.name).toBe("");
      expect(INITIAL_FORM_DATA.email).toBe("");
      expect(INITIAL_FORM_DATA.subject).toBe("");
      expect(INITIAL_FORM_DATA.message).toBe("");
    });
  });

  describe("FORM_FIELD_LABELS", () => {
    it("has labels for all fields", () => {
      expect(FORM_FIELD_LABELS.name).toBe("Name");
      expect(FORM_FIELD_LABELS.email).toBe("Email");
      expect(FORM_FIELD_LABELS.subject).toBe("Subject");
      expect(FORM_FIELD_LABELS.message).toBe("Message");
    });
  });

  describe("FORM_PLACEHOLDERS", () => {
    it("has placeholders for all fields", () => {
      expect(FORM_PLACEHOLDERS.name).toContain("name");
      expect(FORM_PLACEHOLDERS.email).toContain("email");
      expect(FORM_PLACEHOLDERS.subject).toContain("discuss");
      expect(FORM_PLACEHOLDERS.message).toContain("project");
    });
  });

  describe("messages", () => {
    it("has success message", () => {
      expect(SUCCESS_MESSAGE).toContain("Thank you");
    });

    it("has error message", () => {
      expect(ERROR_MESSAGE).toContain("error");
    });
  });
});
