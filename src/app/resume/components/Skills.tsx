interface SkillItemData {
  skill: string;
  level: number;
  years?: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItemData[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Backend (5+ years)",
    skills: [
      { skill: "C#", level: 4, years: "4+ years" },
      { skill: ".NET", level: 5, years: "5+ years" },
      { skill: "RESTful APIs", level: 5, years: "5+ years" },
      { skill: "GraphQL", level: 3, years: "2+ years" },
    ],
  },
  {
    title: "Frontend (3+ years)",
    skills: [
      { skill: "TypeScript", level: 5, years: "3+ years" },
      { skill: "ReactJS", level: 3, years: "2+ years" },
      { skill: "Tailwind", level: 5, years: "2+ years" },
    ],
  },
  {
    title: "Tools & DevOps (3+ years)",
    skills: [
      { skill: "Docker", level: 3, years: "2+ years" },
      { skill: "Node.js", level: 3, years: "2+ years" },
      { skill: "Python", level: 3, years: "2+ years" },
    ],
  },
  {
    title: "Databases (4+ years)",
    skills: [
      { skill: "MS SQL Server", level: 4, years: "4+ years" },
      { skill: "PostgreSQL", level: 3, years: "2+ years" },
    ],
  },
  {
    title: "Architecture & Practices (3+ years)",
    skills: [
      { skill: "Command Query Responsibility Segregation", level: 4, years: "3+ years" },
      { skill: "Domain-Driven Design", level: 3, years: "2+ years" },
      { skill: "Test-Driven Development", level: 3, years: "2+ years" },
      { skill: "Clean Architecture", level: 4, years: "3+ years" },
    ],
  },
];

interface SkillItemProps {
  skill: string;
  level: number;
  years?: string;
}

function SkillItem({ skill, level, years }: Readonly<SkillItemProps>) {
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
  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🛠️</span> Skills
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
