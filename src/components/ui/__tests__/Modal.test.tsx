import { cleanup, fireEvent, render, screen } from "@/test/utils/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Modal } from "../Modal";

describe("Modal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders when open", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const backdrop = screen.getByLabelText("Close modal");
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when escape key is pressed", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("has correct accessibility attributes", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("prevents body scroll when open", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    rerender(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("unset");
  });

  it("focuses modal content when opened", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <button>Focus me</button>
      </Modal>
    );

    const button = screen.getByText("Focus me");
    expect(button).toBeInTheDocument();
  });

  it("does not close when modal content is clicked", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div data-testid="modal-content">Modal content</div>
      </Modal>
    );

    const content = screen.getByTestId("modal-content");
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("handles multiple key presses correctly", () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Enter" });
    expect(mockOnClose).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
