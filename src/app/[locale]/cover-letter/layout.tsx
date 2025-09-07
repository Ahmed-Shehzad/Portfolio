import type { ReactNode } from "react";

interface CoverLetterLayoutProps {
  children: ReactNode;
}

/**
 * Cover Letter Layout Component
 *
 * A dedicated layout for cover letter pages that:
 * - Removes the dark background from the main layout
 * - Provides a clean white/light background for ATS compatibility
 * - Optimizes for print and screen viewing
 * - Removes unnecessary navigation and portfolio elements
 */
export default function CoverLetterLayout({ children }: CoverLetterLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Cover letter content with clean, print-ready styling */}
      <main className="w-full">{children}</main>
    </div>
  );
}
