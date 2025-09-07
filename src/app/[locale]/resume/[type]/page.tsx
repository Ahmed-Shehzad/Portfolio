import { ATSResume } from "@/components/server/ATSResume";
import {
  getLocalizedResumeConfig,
  isValidResumeType,
  type ResumeType,
  type ResumePageProps,
} from "@/features/resume";
import { LanguageSwitcher } from "@/components";
import { SpecializedDownloadButton } from "./components/DownloadButton";
import { notFound } from "next/navigation";
import { generateMetadata } from "./metadata";

// Export metadata generation
export { generateMetadata };

export default async function SpecializedResumePage({ params }: ResumePageProps) {
  const { locale, type } = await params;

  if (!isValidResumeType(type)) {
    notFound();
  }

  const config = await getLocalizedResumeConfig(type as ResumeType, locale);
  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Language Switcher and Download Button - Hidden when printing */}
      <div className="mb-6 flex items-center justify-between bg-gray-50 p-4 print:hidden">
        <div className="flex-1">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 justify-center">
          <SpecializedDownloadButton resumeType={type as ResumeType} />
        </div>
        <div className="flex-1" />
      </div>

      {/* ATS Resume Container */}
      <div className="resume-container print:p-0">
        <ATSResume config={config} locale={locale} />
      </div>
    </div>
  );
}
