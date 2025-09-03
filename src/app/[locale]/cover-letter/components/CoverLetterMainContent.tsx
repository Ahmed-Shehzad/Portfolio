import { CoverLetterHeader } from "./CoverLetterHeader";
import { RecipientSection } from "./RecipientSection";
import { CoverLetterContent } from "./CoverLetterContent";

export function CoverLetterMainContent() {
  return (
    <main className="p-10">
      <CoverLetterHeader />
      <RecipientSection />
      <CoverLetterContent />
    </main>
  );
}
