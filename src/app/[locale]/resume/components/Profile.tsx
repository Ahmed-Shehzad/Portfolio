import { useTranslations } from "next-intl";

export function Profile() {
  const t = useTranslations("resume.profile");

  return (
    <section className="mb-8">
      <h3 className="mb-3 text-lg font-semibold text-green-500">{t("title")}</h3>
      <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
        <p className="text-md leading-relaxed text-gray-700">{t("description")}</p>
      </div>
    </section>
  );
}
