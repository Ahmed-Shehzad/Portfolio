import { useTranslations } from "next-intl";

export function ResumeHeader() {
  const t = useTranslations("resume.header");

  return (
    <header className="mb-6 border-b border-gray-200 pb-4">
      <h1 className="text-3xl font-bold text-gray-900">{t("name")}</h1>
      <p className="text-md mt-1 text-gray-600">{t("title")}</p>
    </header>
  );
}
