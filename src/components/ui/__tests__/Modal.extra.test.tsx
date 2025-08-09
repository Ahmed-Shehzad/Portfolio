import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/ui/Modal";

describe("Modal extra branches", () => {
  it("closes on Escape key", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  // Portal fallback branch requires ESM module spy not supported by JSDOM/Vitest easily; skip here.
});
