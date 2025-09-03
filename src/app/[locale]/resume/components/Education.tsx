import { useTranslations } from "next-intl";

interface EducationData {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export function Education() {
  const t = useTranslations("resume.education");

  const educationData: EducationData = {
    institution: t("institution"),
    degree: t("degree"),
    period: t("period"),
    location: t("location"),
  };

  return (
    <section className="education-section">
      <h3 className="mb-3 text-lg font-semibold text-green-500">{t("title")}</h3>
      <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
        <div className="text-md">
          <h4 className="font-semibold text-gray-900">{educationData.institution}</h4>
          <p className="text-gray-700">{educationData.degree}</p>
          <p className="text-xs text-gray-500">
            {educationData.period} · {educationData.location}
          </p>
        </div>
      </div>
    </section>
  );
}
