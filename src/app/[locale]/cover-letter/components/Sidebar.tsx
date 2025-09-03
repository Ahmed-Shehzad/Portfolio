import { ProfileImage, ContactDetails, Links } from "@/components/shared";
import { CoreStrengths } from "./CoreStrengths";
import { KeyAchievements } from "./KeyAchievements";

export function Sidebar() {
  return (
    <aside className="bg-gray-50 p-8">
      <ProfileImage />
      <div className="text-md mt-6 text-gray-700">
        <ContactDetails showLinks />
        <Links />
        <CoreStrengths />
        <KeyAchievements />
      </div>
    </aside>
  );
}
