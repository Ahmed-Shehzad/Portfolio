import { DownloadButton, ResumeSidebar, ResumeMainContent } from "./components";

export default function ResumePage() {
  return (
    <div
      className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
      style={{ minWidth: "1024px" }}
    >
      {/* Download Button - Hidden when printing */}
      <div className="mb-4 flex justify-center">
        <DownloadButton />
      </div>

      <div className="resume-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="resume-grid grid grid-cols-[380px_620px]">
          <ResumeSidebar />
          <ResumeMainContent />
        </div>
      </div>
    </div>
  );
}
