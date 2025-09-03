import { DownloadButton, Sidebar, CoverLetterMainContent } from "./components";
import { CoverLetterProvider } from "./contexts/CoverLetterContext";

export default function CoverLetterPage() {
  return (
    <CoverLetterProvider>
      <div
        className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
        style={{ minWidth: "1024px" }}
      >
        {/* Download Button - Hidden when printing */}
        <div className="mb-4 flex justify-center">
          <DownloadButton />
        </div>

        <div className="cover-letter-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="cover-letter-grid grid grid-cols-[380px_620px]">
            <Sidebar />
            <CoverLetterMainContent />
          </div>
        </div>
      </div>
    </CoverLetterProvider>
  );
}
