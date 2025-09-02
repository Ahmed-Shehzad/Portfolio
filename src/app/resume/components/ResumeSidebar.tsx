import { ProfileImage, ContactDetails, Links } from "@/components/shared";
import { Skills } from "./Skills";
import { Languages } from "./Languages";

export function ResumeSidebar() {
  return (
    <aside className="bg-gray-50 p-8">
      <ProfileImage />
      <div className="text-md mt-6 text-gray-700">
        <ContactDetails showLinks />
        <Links />
        <Skills />
        <Languages />
      </div>
    </aside>
  );
}
