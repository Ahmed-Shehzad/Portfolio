"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useCoverLetterContext } from "../contexts/CoverLetterContext";

export function DownloadButton() {
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { data } = useCoverLetterContext();
  const locale = useLocale();

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Get the current protocol and domain
      const baseUrl = `${window.location.protocol}//${window.location.host}`;

      // Call the API to generate PDF with form data in request body (using locale-aware route)
      const response = await fetch(`${baseUrl}/${locale}/api/cover-letter-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          "Cache-Control": "no-cache",
          "User-Agent": "Mozilla/5.0 (compatible; PDF-Generator)",
        },
        body: JSON.stringify({
          companyName: data.companyName || "",
          specificReason: data.specificReason || "",
          salaryExpectations: data.salaryExpectations || "",
          expectedJoiningDate: data.expectedJoiningDate || "",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${locale}/cover-letter.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
      setError(error instanceof Error ? error.message : "Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="print:hidden">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-200 ${
          isGenerating
            ? "cursor-not-allowed bg-gray-500"
            : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
        } `}
        type="button"
        aria-label={isGenerating ? "Generating PDF..." : "Download Cover Letter as PDF"}
      >
        {isGenerating ? (
          <>
            <div className="size-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download Cover Letter</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 max-w-md rounded-lg bg-red-50 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="size-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-red-800">Error generating PDF</span>
          </div>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 underline hover:text-red-500"
            type="button"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
