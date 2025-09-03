import { useTranslations } from "next-intl";

interface LanguageData {
  language: string;
  level: number;
}

interface LanguageItemProps {
  language: string;
  level: number;
}

function LanguageItem({ language, level }: Readonly<LanguageItemProps>) {
  const t = useTranslations("resume.languages");

  const getLevelDescription = (level: number): string => {
    return t(`levelDescriptions.${level}`) || "";
  };

  return (
    <li className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">{language}</span>
        <div className="flex items-center gap-2">
          <span className="min-w-[4rem] text-right text-xs text-gray-600 print:text-gray-800">
            {getLevelDescription(level)}
          </span>
        </div>
      </div>
    </li>
  );
}

export function Languages() {
  const t = useTranslations("resume.languages");

  // Convert translation data to LanguageData array
  const languagesData: LanguageData[] = Array.from({ length: 2 }, (_, i) => ({
    language: t(`items.${i}.language`),
    level: Number(t(`items.${i}.level`)) || 0,
  })).filter((lang) => lang.language); // Filter out empty languages

  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🌍</span> {t("title")}
      </h4>
      <ul className="languages-section text-md mt-3 space-y-3 print:space-y-1">
        {languagesData.map((language) => (
          <LanguageItem key={language.language} {...language} />
        ))}
      </ul>
    </>
  );
}
