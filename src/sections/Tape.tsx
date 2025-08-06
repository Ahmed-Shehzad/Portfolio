import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";

const words = [
  // Frontend Development
  "React",
  "Redux",
  "TypeScript",
  "Tailwind CSS",
  "Next.js",
  "Apollo",
  "GraphQL",
  "REST",

  // Backend Development
  "Python",
  "C#",
  "Community Toolkit",
  ".NET",
  "MassTransit",
  "MediatR",
  "PostgreSQL",
  "Redis",

  // DevOps / Cloud / Infrastructure
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "CI/CD",
  "DevOps",

  // Software Architecture / Methodologies
  "Microservices",
  "Agile",
  "Scrum",
  "Test Driven Development",
  "Domain Driven Design",
  "Command Query Responsibility Segregation",
  "Clean Architecture",
];

export const TapeSection = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 py-3 pr-4 animate-[move-left_30s_linear_infinite] hover:[animation-play-state:paused]">
            {["tape-section-1", "tape-section-2", "tape-section-3"].map(
              (section) => (
                <Fragment key={section}>
                  {words.map((word) => (
                    <div
                      key={`${word}-${section}`}
                      className="inline-flex gap-4 items-center"
                    >
                      <span className="text-gray-900 uppercase font-extrabold text-sm">
                        {word}
                      </span>
                      <StarIcon className="size-6 text-gray-900 -rotate-12" />
                    </div>
                  ))}
                </Fragment>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
