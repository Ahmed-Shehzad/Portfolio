import { describe, it, expect } from "vitest";
import { validateEmail } from "../validation";

describe("validateEmail", () => {
  it("accepts a basic valid email", () => {
    const { isValid } = validateEmail("user@example.com");
    expect(isValid).toBe(true);
  });
  it("rejects overly long local part", () => {
    const longLocal = "a".repeat(70) + "@example.com";
    const { isValid } = validateEmail(longLocal);
    expect(isValid).toBe(false);
  });
  it("rejects missing @", () => {
    const { isValid } = validateEmail("user.example.com");
    expect(isValid).toBe(false);
  });
});
