"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { secureLog } from "@/shared/utils/logging";

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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  try {
    return createPortal(
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Backdrop */}
        <button
          className={`absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
          aria-label="Close modal"
        />

        {/* Modal Content */}
        <div
          className={`relative z-10 mx-4 w-full max-w-lg transform transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  } catch (error) {
    secureLog.error(
      "Error creating modal portal:",
      error instanceof Error ? error.message : "Unknown error"
    );
    // Fallback: render the modal inline if createPortal fails
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Backdrop */}
        <button
          className={`absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
          aria-label="Close modal"
        />

        {/* Modal Content */}
        <div
          className={`relative z-10 mx-4 w-full max-w-lg transform transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
};
