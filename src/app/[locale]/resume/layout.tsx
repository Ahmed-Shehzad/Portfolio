import type { ReactNode } from "react";

interface ResumeLayoutProps {
  children: ReactNode;
}

/**
 * Resume Layout Component
 *
 * A dedicated layout for resume pages that:
 * - Removes the dark background from the main layout
 * - Provides a clean white/light background for ATS compatibility
 * - Optimizes for print and screen viewing
 * - Removes unnecessary navigation and portfolio elements
 */
export default function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Resume content with clean, print-ready styling */}
      <main className="w-full">{children}</main>
    </div>
  );
}
