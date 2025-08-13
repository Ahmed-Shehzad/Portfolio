import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock timeout hook to run callbacks immediately for submit promise, but keep post-success delay
vi.mock("@/hooks/useBfcacheCompatible", () => {
  return {
    useBfcacheCompatibleTimeout: () => ({
      setBfcacheTimeout: (cb: any, delay?: number) => {
        if (!delay || delay === 0) {
          cb();
        } else if (delay < 10) {
          // fast-forward tiny delays
          cb();
        } else {
          // simulate queued callback without executing (preserve success message view)
          setTimeout(cb, 0);
        }
      },
    }),
  };
});

import { ContactModal } from "@/components/features/ContactModal";

describe("ContactModal", () => {
  it("submits form and shows success", async () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "This is a message." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));
    // Text copied from component for success state
    expect(
      await screen.findByText(/Thank you! Your message has been sent successfully./i)
    ).toBeTruthy();
  });

  it("shows field validation error for invalid email", () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen onClose={onClose} />);
    const email = screen.getByLabelText(/Email/i);
    fireEvent.change(email, { target: { value: "bad" } });
    fireEvent.blur(email);
    expect(screen.getByText(/valid email address/i)).toBeTruthy();
  });

  it("cancels and calls onClose", async () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen onClose={onClose} />);
    const cancels = screen.getAllByRole("button", { name: /Cancel/i });
    const lastCancel = cancels[cancels.length - 1];
    if (lastCancel) {
      fireEvent.click(lastCancel);
      await waitFor(() => expect(onClose).toHaveBeenCalled());
    }
  });
});
