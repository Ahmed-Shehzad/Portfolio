interface LanguageData {
  language: string;
  level: number;
}

const languagesData: LanguageData[] = [
  { language: "English", level: 4 },
  { language: "German", level: 3 },
];

interface LanguageItemProps {
  language: string;
  level: number;
}

function LanguageItem({ language, level }: Readonly<LanguageItemProps>) {
  const getLevelDescription = (level: number): string => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Novice";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "";
    }
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
  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🌐</span> Languages
      </h4>
      <ul className="text-md mt-3 space-y-3 print:space-y-1">
        {languagesData.map((language) => (
          <LanguageItem key={language.language} {...language} />
        ))}
      </ul>
    </>
  );
}
