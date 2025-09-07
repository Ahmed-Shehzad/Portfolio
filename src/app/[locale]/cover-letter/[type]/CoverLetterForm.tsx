"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/client/ui/Card";

interface CoverLetterFormProps {
  readonly locale: string;
  readonly onFormChange: (formData: {
    positionName: string;
    companyName: string;
    specificReason: string;
    salaryExpectations: string;
    expectedJoiningDate: string;
  }) => void;
}

export function CoverLetterForm({ locale: _locale, onFormChange }: CoverLetterFormProps) {
  const t = useTranslations("coverLetter.forms");

  const [formData, setFormData] = useState({
    positionName: "",
    companyName: "",
    specificReason: "",
    salaryExpectations: "",
    expectedJoiningDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="no-print mb-8 p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-white">Cover Letter Generator</h2>
        <p className="text-white/75">
          Fill in the fields below to customize your cover letter. The PDF will update in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Position Name */}
        <div>
          <label htmlFor="positionName" className="mb-2 block text-sm font-medium text-white">
            {t("positionName")}
          </label>
          <input
            type="text"
            id="positionName"
            value={formData.positionName}
            onChange={(e) => handleInputChange("positionName", e.target.value)}
            placeholder={t("positionNamePlaceholder")}
            className="w-full rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/75">{t("positionNameHelp")}</p>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-white">
            {t("companyName")}
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder={t("companyNamePlaceholder")}
            className="w-full rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/75">{t("companyNameHelp")}</p>
        </div>

        {/* Salary Expectations */}
        <div>
          <label htmlFor="salaryExpectations" className="mb-2 block text-sm font-medium text-white">
            {t("salaryExpectations")}
          </label>
          <input
            type="text"
            id="salaryExpectations"
            value={formData.salaryExpectations}
            onChange={(e) => handleInputChange("salaryExpectations", e.target.value)}
            placeholder={t("salaryExpectationsPlaceholder")}
            className="w-full rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/75">{t("salaryHelp")}</p>
        </div>

        {/* Expected Joining Date */}
        <div>
          <label
            htmlFor="expectedJoiningDate"
            className="mb-2 block text-sm font-medium text-white"
          >
            {t("expectedJoiningDate")}
          </label>
          <input
            type="text"
            id="expectedJoiningDate"
            value={formData.expectedJoiningDate}
            onChange={(e) => handleInputChange("expectedJoiningDate", e.target.value)}
            placeholder={t("expectedJoiningDatePlaceholder")}
            className="w-full rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/75">{t("joiningDateHelp")}</p>
        </div>
      </div>

      {/* Specific Reason - Full Width */}
      <div className="mt-6">
        <label htmlFor="specificReason" className="mb-2 block text-sm font-medium text-white">
          {t("specificReason")}
        </label>
        <textarea
          id="specificReason"
          rows={3}
          value={formData.specificReason}
          onChange={(e) => handleInputChange("specificReason", e.target.value)}
          placeholder={t("specificReasonPlaceholder")}
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-white/75">{t("specificReasonHelp")}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Cover Letter
        </button>
      </div>
    </Card>
  );
}
