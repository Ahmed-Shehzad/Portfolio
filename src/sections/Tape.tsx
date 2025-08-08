import StarIcon from "@/assets/icons/star.svg";
import { ScrollAnimationWrapper } from "@/wrappers";
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
    <section id="tape">
      <ScrollAnimationWrapper animation="fadeIn" className="overflow-x-clip py-16 lg:py-24">
        <div className="-mx-1 -rotate-3 bg-gradient-to-r from-emerald-300 to-sky-400">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex flex-none animate-[move-left_30s_linear_infinite] gap-4 py-3 pr-4 hover:[animation-play-state:paused]">
              {["tape-section-1", "tape-section-2", "tape-section-3"].map((section) => (
                <Fragment key={section}>
                  {words.map((word) => (
                    <div key={`${word}-${section}`} className="inline-flex items-center gap-4">
                      <span className="text-sm font-extrabold text-gray-900 uppercase">{word}</span>
                      <StarIcon className="size-6 -rotate-12 text-gray-900" />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};
