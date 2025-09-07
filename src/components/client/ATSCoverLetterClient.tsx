"use client";

import { useState, useEffect } from "react";

interface ATSCoverLetterClientProps {
  readonly locale: string;
  readonly formData?: {
    positionName: string;
    companyName: string;
    specificReason: string;
    salaryExpectations: string;
    expectedJoiningDate: string;
  };
  readonly translations: {
    readonly common: {
      readonly name: string;
      readonly contact: {
        readonly email: string;
        readonly phone: string;
        readonly linkedin: string;
        readonly location: string;
        readonly website: string;
        readonly Github: string;
      };
    };
    readonly subject: string;
    readonly greeting: string;
    readonly content: {
      readonly opening: string;
      readonly experience1: string;
      readonly experience2: string;
      readonly technical: string;
      readonly unique: string;
      readonly interest: string;
      readonly interestPlaceholder: string;
      readonly value: string;
      readonly closing1: string;
      readonly salaryText: string;
      readonly availabilityText: string;
      readonly closing2: string;
      readonly signature: string;
      readonly name: string;
    };
  };
}

export function ATSCoverLetterClient({
  locale,
  formData,
  translations: t,
}: ATSCoverLetterClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use form data or fallbacks
  const positionName = formData?.positionName || "Software Engineer";
  const companyName = formData?.companyName || "";
  const specificReason = formData?.specificReason || "";
  const salaryExpectations = formData?.salaryExpectations || "";
  const expectedJoiningDate = formData?.expectedJoiningDate || "";

  // Helper function to handle company name replacement
  const fallbackCompany = locale === "de" ? "diesem Unternehmen" : "this company";
  const companyNamePlaceholder = "{companyName}";
  const replaceCompanyName = (text: string) => {
    // Only apply smart replacements on the client side to avoid hydration mismatches
    if (!isClient) {
      // On server, always use fallback to ensure consistent rendering
      return text.replace(companyNamePlaceholder, fallbackCompany);
    }

    if (!companyName) {
      // If no company name provided, handle it gracefully
      if (text.includes("position at {companyName}")) {
        return text.replace("position at {companyName}", "position");
      }
      if (text.includes("-Position bei {companyName}")) {
        return text.replace("-Position bei {companyName}", "-Position");
      }
      if (text.includes("drawn to {companyName}")) {
        return text.replace("drawn to {companyName}", "drawn to this opportunity");
      }
      if (text.includes("von {companyName} angezogen")) {
        return text.replace("von {companyName} angezogen", "von dieser Gelegenheit angezogen");
      }
      // For any other instances, replace with "this company"
      return text.replace(companyNamePlaceholder, fallbackCompany);
    }
    return text.replace(companyNamePlaceholder, companyName);
  };
  return (
    <div className="w-full">
      <div className="ats-cover-letter">
        <div className="cover-letter-content bg-white p-12 text-gray-900">
          {/* Header */}
          <header className="mb-8 border-b-2 border-gray-800 pb-6">
            <div className="mb-6">
              <h1 className="mb-4 text-3xl font-bold text-gray-900">{t.common.name}</h1>
              <div className="contact-info grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2">
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${t.common.contact.email}`}
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.email}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href={`tel:${t.common.contact.phone.replace(/\s+/g, "")}`}
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Location:</span>{" "}
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(t.common.contact.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.location}
                  </a>
                </div>
                <div>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  <a
                    href={
                      t.common.contact.linkedin.startsWith("http")
                        ? t.common.contact.linkedin
                        : `https://${t.common.contact.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.linkedin}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={
                      t.common.contact.website.startsWith("http")
                        ? t.common.contact.website
                        : `https://${t.common.contact.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.website}
                  </a>
                </div>
                <div>
                  <span className="font-medium">GitHub:</span>{" "}
                  <a
                    href={
                      t.common.contact.Github.startsWith("http")
                        ? t.common.contact.Github
                        : `https://${t.common.contact.Github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    {t.common.contact.Github}
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Letter Content */}
          <main className="space-y-6">
            {/* Date */}
            <div className="text-right text-sm text-gray-600">
              {new Date().toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            {/* Subject Line */}
            <div className="font-medium text-gray-900">
              <strong>Subject:</strong> {t.subject.replace("{positionName}", positionName)}
            </div>

            {/* Greeting */}
            <div className="text-gray-900">{t.greeting}</div>

            {/* Opening Paragraph */}
            <p className="leading-relaxed text-gray-900">
              {replaceCompanyName(t.content.opening).replace("{positionName}", positionName)}
            </p>

            {/* Experience Paragraphs */}
            <p className="leading-relaxed text-gray-900">{t.content.experience1}</p>

            <p className="leading-relaxed text-gray-900">{t.content.experience2}</p>

            <p className="leading-relaxed text-gray-900">{t.content.technical}</p>

            <p className="leading-relaxed text-gray-900">{t.content.unique}</p>

            {/* Company Interest */}
            <p className="leading-relaxed text-gray-900">
              {replaceCompanyName(t.content.interest)}{" "}
              {specificReason || (
                <span className="text-gray-500 italic">{t.content.interestPlaceholder}</span>
              )}
              {t.content.value}
            </p>

            {/* Closing */}
            <p className="leading-relaxed text-gray-900">{t.content.closing1}</p>

            {/* Optional Salary Information */}
            {salaryExpectations && (
              <p className="leading-relaxed text-gray-900">
                {t.content.salaryText.replace("{salaryExpectations}", salaryExpectations)}
              </p>
            )}

            {/* Optional Availability Information */}
            {expectedJoiningDate && (
              <p className="leading-relaxed text-gray-900">
                {t.content.availabilityText.replace("{expectedJoiningDate}", expectedJoiningDate)}
              </p>
            )}

            <p className="leading-relaxed text-gray-900">{t.content.closing2}</p>

            {/* Signature */}
            <div className="mt-8">
              <p className="text-gray-900">{t.content.signature}</p>
              <p className="mt-4 font-medium text-gray-900">{t.content.name}</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
