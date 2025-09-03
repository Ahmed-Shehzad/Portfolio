import { useTranslations } from "next-intl";

interface SkillItemData {
  skill: string;
  level: number;
  years?: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItemData[];
}

interface SkillItemProps {
  skill: string;
  level: number;
  years?: string;
}

function SkillItem({ skill, level, years }: Readonly<SkillItemProps>) {
  const t = useTranslations("resume.skills");

  const getLevelDescription = (level: number): string => {
    return t(`levelDescriptions.${level}`) || "";
  };

  return (
    <li className="mb-4 rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">{skill}</span>
        <div className="flex items-center gap-2">
          <span className="min-w-[4rem] text-right text-xs text-gray-600 print:text-gray-800">
            {years || getLevelDescription(level)}
          </span>
        </div>
      </div>
    </li>
  );
}

function SkillCategory({ title, skills }: Readonly<SkillCategory>) {
  return (
    <>
      <div className="mb-2">
        <h5 className="text-md font-bold text-gray-500">{title}</h5>
      </div>
      {skills.map((skill) => (
        <SkillItem key={skill.skill} {...skill} />
      ))}
    </>
  );
}

export function Skills() {
  const t = useTranslations("resume.skills");

  // Convert translation data to SkillCategory array
  const skillsData: SkillCategory[] = Array.from({ length: 5 }, (_, i) => {
    // Determine number of skills per category
    const skillCount = i === 0 || i === 4 ? 4 : 3;

    return {
      title: t(`categories.${i}.title`),
      skills: Array.from({ length: skillCount }, (__, j) => ({
        skill: t(`categories.${i}.skills.${j}.skill`),
        level: Number(t(`categories.${i}.skills.${j}.level`)) || 0,
        years: t(`categories.${i}.skills.${j}.years`),
      })).filter((skill) => skill.skill), // Filter out empty skills
    };
  }).filter((category) => category.title); // Filter out empty categories

  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🛠️</span> {t("title")}
      </h4>
      <ul className="skills-section text-md mt-3 space-y-3 print:space-y-1">
        {skillsData.map((category, index) => (
          <div key={category.title} className={index > 0 ? "mt-4" : ""}>
            <SkillCategory {...category} />
          </div>
        ))}
      </ul>
    </>
  );
}
