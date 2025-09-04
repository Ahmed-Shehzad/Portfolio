import { DynamicResumeContent } from "@/lib/optimization/dynamic-imports";
import { DownloadButton } from "./components/DownloadButton";
import { ResumeSidebar } from "./components/ResumeSidebar";
import { LanguageSwitcher } from "@/components";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResumePage({ params }: ResumePageProps) {
  // Await params to ensure proper locale handling
  const { locale } = await params;

  return (
    <div
      className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
      style={{ minWidth: "1024px" }}
    >
      {/* Language Switcher and Download Button - Hidden when printing */}
      <div className="mb-4 flex items-center justify-between print:hidden">
        <div className="flex-1">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 justify-center">
          <DownloadButton />
        </div>
        <div className="flex-1" />
      </div>

      <div className="resume-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="resume-grid grid grid-cols-[380px_620px]">
          <ResumeSidebar locale={locale} />
          <DynamicResumeContent />
        </div>
      </div>
    </div>
  );
}
