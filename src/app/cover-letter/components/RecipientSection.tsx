"use client";

import { useState } from "react";

export function RecipientSection() {
  const [companyName, setCompanyName] = useState("");

  return (
    <section className="mb-6">
      <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
        <div className="text-md text-gray-700">
          <div className="font-medium text-gray-800">To: Hiring Manager</div>
          <div className="text-gray-600">{companyName || "[Company Name]"}</div>
        </div>
      </div>

      {/* Interactive input fields - hidden in print */}
      <div className="mt-4 space-y-3 print:hidden">
        <div>
          <label htmlFor="company-name" className="mb-2 block text-sm font-medium text-gray-700">
            Company Name:
          </label>
          <input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name..."
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <p className="text-xs text-gray-500">
          This field will update the PDF in real-time. Leave empty to show placeholder text.
        </p>
      </div>
    </section>
  );
}
