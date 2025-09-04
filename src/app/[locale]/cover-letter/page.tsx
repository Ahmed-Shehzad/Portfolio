import { DownloadButton, CoverLetterMainContent } from "./components";
import { Sidebar } from "./components/Sidebar";
import { CoverLetterProvider } from "./contexts/CoverLetterContext";
import { LanguageSwitcher } from "@/components";

interface CoverLetterPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CoverLetterPage({ params }: CoverLetterPageProps) {
  const { locale } = await params;

  return (
    <CoverLetterProvider>
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

        <div className="cover-letter-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="cover-letter-grid grid grid-cols-[380px_620px]">
            <Sidebar locale={locale} />
            <CoverLetterMainContent />
          </div>
        </div>
      </div>
    </CoverLetterProvider>
  );
}
