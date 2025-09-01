"use client";

import { useState } from "react";

export function DownloadButton() {
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Call the API to generate PDF with proper headers
      const response = await fetch("http://localhost:3000/api/resume-pdf", {
        method: "GET",
        headers: {
          Accept: "application/pdf",
          "Cache-Control": "no-cache",
          "User-Agent": "Mozilla/5.0 (compatible; PDF-Generator)",
        },
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
      link.download = "resume.pdf";
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
    <>
      {error && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-red-600">PDF Generation Error</h3>
            <p className="mb-4 text-gray-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white shadow-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none ${
          isGenerating ? "cursor-not-allowed bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
        aria-label={isGenerating ? "Generating PDF..." : "Download Resume"}
      >
        {isGenerating ? (
          <>
            <svg className="size-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download PDF</span>
          </>
        )}
      </button>
    </>
  );
}
