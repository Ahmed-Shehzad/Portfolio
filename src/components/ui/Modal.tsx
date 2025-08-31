"use client";

import { secureLog } from "@/shared/utils/logging";
import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: IModalProps) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <dialog open aria-modal="true" className="relative z-10 mx-4 w-full max-w-lg">
        {children}
      </dialog>
    </div>
  );

  try {
    if (typeof document === "undefined") return null;
    return createPortal(modalContent, document.body);
  } catch (error) {
    secureLog.error(
      "Error creating modal portal:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return modalContent;
  }
};
