"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: IModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <button
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
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
};
