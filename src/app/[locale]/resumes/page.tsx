import { RESUME_TYPES, getLocalizedResumeConfig } from "@/features/resume";
import { LanguageSwitcher } from "@/components";
import Link from "next/link";

interface ResumeSelectionPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResumeSelectionPage({ params }: ResumeSelectionPageProps) {
  const { locale } = await params;

  // Get all localized configurations
  const configurations = await Promise.all(
    RESUME_TYPES.map(async (type) => ({
      type,
      config: await getLocalizedResumeConfig(type, locale),
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6">
      {/* Language Switcher - Hidden when printing */}
      <div className="mb-8 flex justify-start print:hidden">
        <LanguageSwitcher />
      </div>

      {/* Resume Selection */}
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Choose Resume Type</h1>
          <p className="text-xl text-gray-300">
            Select the specialized resume that best matches your needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {configurations.map(({ type, config }) => {
            if (!config) return null;
            return (
              <Link key={type} href={`/${locale}/resume/${type}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <div className="p-8">
                    <div className="mb-6 text-center">
                      {/* Icon based on resume type */}
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                        {type === "frontend" && (
                          <svg
                            className="h-8 w-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {type === "backend" && (
                          <svg
                            className="h-8 w-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                            />
                          </svg>
                        )}
                        {type === "fullstack" && (
                          <svg
                            className="h-8 w-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        )}
                      </div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">{config.title}</h2>
                    </div>

                    <p className="mb-6 text-center leading-relaxed text-gray-600">
                      {config.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-800">Key Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                          {(
                            config.skills.primary ||
                            config.skills.frontend ||
                            config.skills.backend ||
                            Object.values(config.skills).find((arr) => Array.isArray(arr)) ||
                            []
                          )
                            .slice(0, 4)
                            .map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="pt-4 text-center">
                        <span className="inline-flex items-center font-medium text-blue-600 transition-colors group-hover:text-blue-800">
                          View Resume
                          <svg
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
