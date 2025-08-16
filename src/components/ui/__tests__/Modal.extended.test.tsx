import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../Modal";

describe("Modal Extended Coverage", () => {
  it("handles escape key press", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("prevents closing on content click", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <div data-testid="content">Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("manages body scroll", () => {
    const { rerender } = render(
      <Modal isOpen onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("unset");
  });
});
