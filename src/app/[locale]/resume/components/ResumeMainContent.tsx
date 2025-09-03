import { ResumeHeader } from "./ResumeHeader";
import { Profile } from "./Profile";
import { EmploymentHistory } from "./EmploymentHistory";
import { Education } from "./Education";

export function ResumeMainContent() {
  return (
    <main className="p-10">
      <ResumeHeader />
      <Profile />
      <EmploymentHistory />
      <Education />
    </main>
  );
}
