import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "../useContactForm";

vi.mock("@/lib/api/contact", () => ({
  submitContactForm: vi.fn(),
}));

describe("useContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.formData).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitStatus).toBe("idle");
  });

  it("updates form data", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "John Doe");
    });

    expect(result.current.formData.name).toBe("John Doe");
  });

  it("validates form on submit", async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      await result.current.submitForm();
    });

    expect(Object.keys(result.current.errors)).toHaveLength(4);
    expect(result.current.isSubmitting).toBe(false);
  });

  it("resets form", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "John Doe");
      result.current.resetForm();
    });

    expect(result.current.formData.name).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.submitStatus).toBe("idle");
  });
});
