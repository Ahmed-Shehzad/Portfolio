import {
  DynamicDownloadButton,
  DynamicResumeSidebar,
  DynamicResumeContent,
} from "@/lib/optimization/dynamic-imports";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResumePage({ params }: ResumePageProps) {
  // Await params to ensure proper locale handling
  await params;

  return (
    <div
      className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
      style={{ minWidth: "1024px" }}
    >
      {/* Download Button - Hidden when printing */}
      <div className="mb-4 flex justify-center">
        <DynamicDownloadButton />
      </div>

      <div className="resume-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="resume-grid grid grid-cols-[380px_620px]">
          <DynamicResumeSidebar />
          <DynamicResumeContent />
        </div>
      </div>
    </div>
  );
}
