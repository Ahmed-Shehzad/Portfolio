import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LanguageSwitcher } from "@/components";
import "./print.css";
import { CoverLetterClientPage } from "./CoverLetterClientPage";

// Constants to avoid duplication
const COVER_LETTER_SUFFIX = "Cover Letter";
const TITLE_KEY = "metadata.title";
const DESCRIPTION_KEY = "metadata.description";

interface CoverLetterPageProps {
  readonly params: Promise<{
    locale: string;
    type: string;
  }>;
  readonly searchParams: Promise<{
    position?: string;
    company?: string;
    reason?: string;
    salary?: string;
    startDate?: string;
  }>;
}

/**
 * Dynamic Cover Letter Page
 *
 * Generates ATS-optimized cover letters for different developer roles:
 * - frontend: Frontend Developer positions
 * - backend: Backend Developer positions
 * - fullstack: Fullstack Developer positions
 */
export default async function CoverLetterPage({ params, searchParams }: CoverLetterPageProps) {
  const { locale, type } = await params;
  const resolvedSearchParams = await searchParams;

  // Validate cover letter type
  const validTypes = ["frontend", "backend", "fullstack"];
  if (!validTypes.includes(type)) {
    notFound();
  }

  // Get translations for metadata and content
  const t = await getTranslations({ locale, namespace: "coverLetter" });

  // Prepare translations object for client component
  const translations = {
    common: {
      name: t("common.name"),
      contact: {
        email: t("common.contact.email"),
        phone: t("common.contact.phone"),
        location: t("common.contact.location"),
        linkedin: t("common.contact.linkedin"),
        website: t("common.contact.website"),
        Github: t("common.contact.Github"),
      },
    },
    subject: t.raw("subject"),
    greeting: t("greeting"),
    content: {
      opening: t.raw(`${type}.opening`),
      experience1: t(`${type}.experience1`),
      experience2: t(`${type}.experience2`),
      technical: t(`${type}.technical`),
      unique: t(`${type}.unique`),
      interest: t.raw("content.interest"),
      interestPlaceholder: t("content.interestPlaceholder"),
      value: t("content.value"),
      closing1: t("content.closing1"),
      salaryText: t.raw("content.salaryText"),
      availabilityText: t.raw("content.availabilityText"),
      closing2: t("content.closing2"),
      signature: t("content.signature"),
      name: t("content.name"),
    },
  };

  // Prepare form data from search parameters
  const formData = {
    ...(resolvedSearchParams.position && { positionName: resolvedSearchParams.position }),
    ...(resolvedSearchParams.company && { companyName: resolvedSearchParams.company }),
    ...(resolvedSearchParams.reason && { specificReason: resolvedSearchParams.reason }),
    ...(resolvedSearchParams.salary && { salaryExpectations: resolvedSearchParams.salary }),
    ...(resolvedSearchParams.startDate && { expectedJoiningDate: resolvedSearchParams.startDate }),
  };

  return (
    <main className="min-h-screen bg-gray-50 print:bg-white">
      {/* Language Switcher - Hidden when printing */}
      <div className="mb-6 flex items-center justify-between bg-gray-50 p-4 print:hidden">
        <div className="flex-1">
          <LanguageSwitcher />
        </div>
        <div className="flex-1" />
        <div className="flex-1" />
      </div>

      {/* SEO-friendly metadata in DOM */}
      <div className="sr-only">
        <h1>
          {t(TITLE_KEY, { type })} - {COVER_LETTER_SUFFIX}
        </h1>
        <p>{t(DESCRIPTION_KEY, { type })}</p>
      </div>

      {/* Cover Letter with Interactive Form */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              <p className="text-gray-600">Loading cover letter...</p>
            </div>
          </div>
        }
      >
        <CoverLetterClientPage
          locale={locale}
          initialFormData={formData}
          translations={translations}
        />
      </Suspense>
    </main>
  );
}

// Generate static parameters for all cover letter types
export function generateStaticParams() {
  return [{ type: "frontend" }, { type: "backend" }, { type: "fullstack" }];
}

// Generate metadata for each cover letter type
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;

  // Validate cover letter type
  const validTypes = ["frontend", "backend", "fullstack"];
  if (!validTypes.includes(type)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "coverLetter" });

  return {
    title: t(TITLE_KEY, { type }),
    description: t(DESCRIPTION_KEY, { type }),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: t(TITLE_KEY, { type }),
      description: t(DESCRIPTION_KEY, { type }),
      type: "article",
    },
  };
}
