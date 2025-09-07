"use client";

import { useState } from "react";
import { CoverLetterForm } from "./CoverLetterForm";
import { ATSCoverLetterClient } from "@/components/client";

interface CoverLetterClientPageProps {
  readonly locale: string;
  readonly initialFormData?: {
    positionName?: string;
    companyName?: string;
    specificReason?: string;
    salaryExpectations?: string;
    expectedJoiningDate?: string;
  };
  readonly translations: {
    common: {
      name: string;
      contact: {
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
        Github: string;
      };
    };
    subject: string;
    greeting: string;
    content: {
      opening: string;
      experience1: string;
      experience2: string;
      technical: string;
      unique: string;
      interest: string;
      interestPlaceholder: string;
      value: string;
      closing1: string;
      salaryText: string;
      availabilityText: string;
      closing2: string;
      signature: string;
      name: string;
    };
  };
}

/**
 * Client-side Cover Letter Page with Interactive Form
 *
 * Features:
 * - Real-time form updates
 * - Print functionality
 * - PDF generation
 * - Multilingual support
 */
export function CoverLetterClientPage({
  locale,
  initialFormData,
  translations,
}: CoverLetterClientPageProps) {
  const [formData, setFormData] = useState({
    positionName: initialFormData?.positionName || "",
    companyName: initialFormData?.companyName || "",
    specificReason: initialFormData?.specificReason || "",
    salaryExpectations: initialFormData?.salaryExpectations || "",
    expectedJoiningDate: initialFormData?.expectedJoiningDate || "",
  });

  const handleFormChange = (newFormData: typeof formData) => {
    setFormData(newFormData);
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="mx-auto max-w-6xl py-8 print:py-0">
        {/* Form for user inputs */}
        <CoverLetterForm locale={locale} onFormChange={handleFormChange} />

        {/* Cover Letter Display */}
        <div className="mt-8">
          <ATSCoverLetterClient locale={locale} formData={formData} translations={translations} />
        </div>
      </div>
    </div>
  );
}
