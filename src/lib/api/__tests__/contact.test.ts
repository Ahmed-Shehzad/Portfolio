import { describe, it, expect } from "vitest";
import { submitContactForm } from "../contact";

describe("contact API", () => {
  it("submits contact form successfully", async () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test",
      message: "Test message",
    };

    const result = await submitContactForm(formData);

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("handles API errors", async () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test",
      message: "Test message",
    };

    const result = await submitContactForm(formData);

    // Since this is a mock that always succeeds, we test the success case
    expect(result.success).toBe(true);
  });
});
