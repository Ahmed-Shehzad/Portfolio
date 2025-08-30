"use client";

import { useState } from "react";

// Component for downloading PDF resume
// import resumePdf from '@/assets/documents/resume.pdf';

export function DownloadButton() {
  const [error, setError] = useState<string | null>(null);

  const handleDownload = () => {
    // Using dynamic import (works with current webpack config)
    import("@/assets/documents/resume.pdf")
      .then((module) => {
        const link = document.createElement("a");
        link.href = module.default;
        link.download = "Muhammad_Ahmed_Shehzad_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        setError(`Error downloading resume: ${error.message}`);
      });
  };

  return (
    <>
      {error && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-red-600">Download Error</h3>
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
        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white shadow-lg transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Download Resume"
      >
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
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        Download
      </button>
    </>
  );
}
