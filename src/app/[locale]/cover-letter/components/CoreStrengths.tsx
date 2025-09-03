interface StrengthItem {
  title: string;
  description: string;
}

const strengthsData: StrengthItem[] = [
  {
    title: "Backend Development",
    description: "C#, .NET, RESTful APIs",
  },
  {
    title: "Full-Stack Skills",
    description: "TypeScript, React, Tailwind",
  },
  {
    title: "Architecture",
    description: "Clean Architecture, DDD, CQRS",
  },
  {
    title: "Database Design",
    description: "SQL Server, PostgreSQL",
  },
  {
    title: "API Integration",
    description: "GraphQL, Twilio, Third-party APIs",
  },
  {
    title: "DevOps & Tools",
    description: "Docker, CI/CD, Version Control",
  },
  {
    title: "Testing & Quality",
    description: "TDD, Unit Testing",
  },
  {
    title: "Problem Solving",
    description: "Analytical thinking, Innovation",
  },
  {
    title: "Team Collaboration",
    description: "Agile, Code Reviews, Mentoring",
  },
  {
    title: "Performance Optimization",
    description: "Scalability, Efficiency, Monitoring",
  },
];

interface StrengthCardProps {
  strength: StrengthItem;
}

function StrengthCard({ strength }: Readonly<StrengthCardProps>) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
      <div className="font-medium text-gray-800">{strength.title}</div>
      <div className="text-gray-600">{strength.description}</div>
    </div>
  );
}

export function CoreStrengths() {
  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🎯</span> Core Strengths
      </h4>
      <div className="mt-3 space-y-2 text-xs">
        {strengthsData.map((strength) => (
          <StrengthCard key={strength.title} strength={strength} />
        ))}
      </div>
    </>
  );
}
