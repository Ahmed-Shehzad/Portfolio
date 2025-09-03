import StarIcon from "@/assets/icons/star.svg";
import { ScrollAnimationWrapper } from "@/wrappers";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

/**
 * TapeSection
 *
 * Repeating marquee "tape" showcasing technology / methodology keywords.
 * Duplicate dataset enables seamless infinite animation (two passes) with
 * second pass aria-hidden for accessibility.
 */
export const TapeSection = () => {
  const t = useTranslations("technologies");

  // Create an array of technology words by accessing numbered keys
  const words: string[] = [];

  // Use a safer approach with try-catch for each translation
  for (let i = 0; i < 28; i++) {
    // We know we have exactly 28 technologies (0-27)
    try {
      const key = `words.${i}`;
      const word = t(key);
      // Check if the translation was found (not the key itself)
      if (word && !word.includes("technologies.words.")) {
        words.push(word);
      } else {
        break; // Stop when no more translations found
      }
    } catch {
      // Stop when translation key doesn't exist
      break;
    }
  }

  // If no translations were loaded, use fallback
  if (words.length === 0) {
    words.push(
      "React",
      "Redux",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Next.js",
      "C#",
      ".NET",
      "ASP.NET Core",
      "Entity Framework",
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "Git",
      "GitHub",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "Clean Architecture",
      "Test Driven Development",
      "Domain Driven Design",
      "Command Query Responsibility Segregation"
    );
  }

  return (
    <section id="tape">
      <ScrollAnimationWrapper animation="fadeIn" className="overflow-x-clip py-16 lg:py-24">
        <div className="-mx-1 -rotate-3 bg-gradient-to-r from-emerald-300 to-sky-400">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex flex-none animate-[move-left_30s_linear_infinite] gap-4 py-3 pr-4 will-change-transform hover:[animation-play-state:paused]">
              {[0, 1].map((repeat) => (
                <Fragment key={`tape-dup-${repeat}`}>
                  {words.map((word: string) => (
                    <div
                      key={`${word}-${repeat}`}
                      className="inline-flex items-center gap-4"
                      aria-hidden={repeat === 1}
                    >
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
