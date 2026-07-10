"use client";

import { secureLog } from "@/shared/utils/logging";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label?: string;
}

export const Modal = ({ children, isOpen, onClose, label = "Dialog" }: IModalProps) => {
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

  // AnimatePresence stays mounted so the dialog can play its exit
  // animation before unmounting.
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.button
            className="absolute inset-0 cursor-pointer bg-indigo-950/25 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          {/* bg-transparent kills the native <dialog> white UA background,
           * which otherwise shows as square corners behind the rounded
           * glass panel. */}
          <dialog
            open
            aria-modal="true"
            aria-label={label}
            className="relative z-10 mx-4 w-full max-w-lg bg-transparent"
          >
            <motion.div
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </dialog>
        </div>
      )}
    </AnimatePresence>
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
