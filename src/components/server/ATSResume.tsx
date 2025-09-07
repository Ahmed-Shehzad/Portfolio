import type { ResumeConfig } from "@/features/resume";
import { getTranslations } from "next-intl/server";

interface ATSResumeProps {
  readonly config: ResumeConfig;
  readonly locale: string;
}

/**
 * ATS-Ready Resume Component
 *
 * Designed for:
 * - Applicant Tracking System compatibility
 * - Single continuous page layout for web
 * - Multi-page layout with proper breaks for print/PDF
 * - Consistent design across web and print modes
 * - Tailwind CSS v4 optimized
 */
export async function ATSResume({ config, locale }: ATSResumeProps) {
  const t = await getTranslations({ locale, namespace: "resume" });

  // Contact information constants for better maintainability
  const contactEmail = t("common.contact.email");
  const contactPhone = t("common.contact.phone");
  const contactPhoneHref = contactPhone.replace(/\s/g, "");

  return (
    <div className="w-full">
      {/* Resume Container */}
      <div className="ats-resume">
        <div className="resume-content">
          {/* Header Section */}
          <header className="ats-header mb-8 border-b-2 border-gray-800 pb-6">
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
              {t("common.name")}
            </h1>
            <h2 className="mb-4 text-xl font-medium text-gray-700">{config.title}</h2>

            <footer
              className="contact-info grid grid-cols-1 gap-2 text-sm text-gray-600 not-italic md:grid-cols-2"
              aria-label="Contact information"
            >
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="mr-2 font-medium" id="email-label">
                    Email:
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="rounded-sm text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none print:text-gray-700 print:no-underline"
                    aria-labelledby="email-label"
                    aria-describedby="email-description"
                    title={`Send email to ${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                  <span id="email-description" className="sr-only">
                    Primary email address for professional contact
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-medium" id="phone-label">
                    Phone:
                  </span>
                  <a
                    href={`tel:${contactPhoneHref}`}
                    className="rounded-sm text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none print:text-gray-700 print:no-underline"
                    aria-labelledby="phone-label"
                    aria-describedby="phone-description"
                    title={`Call ${contactPhone}`}
                  >
                    {contactPhone}
                  </a>
                  <span id="phone-description" className="sr-only">
                    Primary phone number for professional contact
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-medium" id="location-label">
                    Location:
                  </span>
                  <a
                    href="https://maps.google.com/?q=Wiesbaden,Germany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none print:text-gray-700 print:no-underline"
                    aria-labelledby="location-label"
                    aria-describedby="location-description"
                    title="View location on Google Maps (opens in new tab)"
                  >
                    {t("common.contact.location")}
                  </a>
                  <span id="location-description" className="sr-only">
                    Current professional location - opens Google Maps in new tab
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="mr-2 font-medium" id="linkedin-label">
                    LinkedIn:
                  </span>
                  <a
                    href={`https://${t("common.contact.linkedin")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm break-all text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none print:text-gray-700 print:no-underline"
                    aria-labelledby="linkedin-label"
                    aria-describedby="linkedin-description"
                    title="Visit LinkedIn profile (opens in new tab)"
                  >
                    {t("common.contact.linkedin")}
                  </a>
                  <span id="linkedin-description" className="sr-only">
                    Professional LinkedIn profile - opens in new tab
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-medium" id="website-label">
                    Website:
                  </span>
                  <a
                    href={`https://${t("common.contact.website")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none print:text-gray-700 print:no-underline"
                    aria-labelledby="website-label"
                    aria-describedby="website-description"
                    title="Visit personal website (opens in new tab)"
                  >
                    {t("common.contact.website")}
                  </a>
                  <span id="website-description" className="sr-only">
                    Personal portfolio website - opens in new tab
                  </span>
                </div>
              </div>
            </footer>
          </header>

          {/* Professional Summary */}
          <section className="ats-section mb-8">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              {t("common.sections.summary")}
            </h2>
            <p className="leading-relaxed text-gray-800">{config.summary || config.description}</p>
          </section>

          {/* Technical Skills */}
          <section className="ats-section mb-8">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              {t("common.sections.skills")}
            </h2>

            <div className="skills-sections space-y-4">
              {/* Frontend Skills (Frontend Resume) */}
              {config.skills.frontend && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.frontend")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.frontend.join(" • ")}</div>
                </div>
              )}

              {/* Backend Skills (Backend Resume) */}
              {config.skills.backend && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.backend")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.backend.join(" • ")}</div>
                </div>
              )}

              {/* Architecture Skills */}
              {config.skills.architecture && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.architecture")}
                  </h3>
                  <div className="text-sm text-gray-700">
                    {config.skills.architecture.join(" • ")}
                  </div>
                </div>
              )}

              {/* Cloud Skills (Backend Resume) */}
              {config.skills.cloud && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.cloud")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.cloud.join(" • ")}</div>
                </div>
              )}

              {/* Databases Skills (Backend Resume) */}
              {config.skills.databases && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.databases")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.databases.join(" • ")}</div>
                </div>
              )}

              {/* Testing Skills */}
              {config.skills.testing && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.testing")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.testing.join(" • ")}</div>
                </div>
              )}

              {/* Development Skills (Frontend Resume) */}
              {config.skills.development && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.development")}
                  </h3>
                  <div className="text-sm text-gray-700">
                    {config.skills.development.join(" • ")}
                  </div>
                </div>
              )}

              {/* DevOps Skills */}
              {config.skills.devops && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {t("skills.categories.devops")}
                  </h3>
                  <div className="text-sm text-gray-700">{config.skills.devops.join(" • ")}</div>
                </div>
              )}
            </div>
          </section>

          {/* Tools Section - Horizontal Layout */}
          {config.skills.tools && (
            <section className="ats-section mb-6">
              <h2 className="ats-section-title mb-3 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
                {t("skills.categories.tools")}
              </h2>
              <div className="text-sm text-gray-700">{config.skills.tools.join(" • ")}</div>
            </section>
          )}

          {/* Professional Experience - All experiences in one section */}
          <section className="ats-section mb-8">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              {t("common.sections.experience")}
            </h2>

            {config.experience.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.position}`}
                className={`experience-item mb-8 last:mb-0 ${
                  index === 2 ? "print-page-break-before" : ""
                }`}
              >
                <div className="experience-header mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">{exp.company}</span>
                    <span className="text-sm font-medium text-gray-600">{exp.duration}</span>
                  </div>
                  <div className="mb-3 text-sm text-gray-600">{exp.location}</div>
                </div>

                <div className="technologies mb-4">
                  <h4 className="mb-2 text-base font-semibold text-gray-800">Technologies:</h4>
                  <p className="text-sm text-gray-700">{exp.technologies.join(" • ")}</p>
                </div>

                <div className="achievements">
                  <h4 className="mb-3 text-base font-semibold text-gray-800">
                    Key Accomplishments:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement.substring(0, 30)} className="flex items-start">
                        <span className="mt-1 mr-2 h-1 w-1 rounded-full bg-gray-600" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Key Projects */}
          <section className="ats-section print-page-break-before mb-8">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              {t("common.sections.projects")}
            </h2>

            {config.projects.map((project) => (
              <div key={project.name} className="project-item mb-6 last:mb-0">
                <div className="project-header mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="mb-3 text-sm text-gray-700">{project.description}</p>
                </div>

                <div className="project-technologies mb-3">
                  <h4 className="mb-2 text-base font-semibold text-gray-800">Technologies:</h4>
                  <p className="text-sm text-gray-700">{project.technologies.join(" • ")}</p>
                </div>

                <div className="project-achievements">
                  <h4 className="mb-2 text-base font-semibold text-gray-800">Key Results:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {project.achievements.map((achievement) => (
                      <li key={achievement.substring(0, 30)} className="flex items-start">
                        <span className="mt-1 mr-2 h-1 w-1 rounded-full bg-gray-600" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="ats-section print-page-break-before mb-8">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              EDUCATION
            </h2>

            <div className="education-section">
              <div className="space-y-2 text-sm text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="font-medium">University of South Asia</p>
                <p className="text-gray-600">2012 - 2017 | Lahore, Pakistan</p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section className="ats-section">
            <h2 className="ats-section-title mb-4 border-b border-gray-400 pb-2 text-2xl font-bold text-gray-900">
              {t("common.sections.languages")}
            </h2>

            <div className="languages-grid grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="text-sm">
                <span className="font-semibold text-gray-800">English:</span>
                <span className="ml-2 text-gray-700">Fluent</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-800">German:</span>
                <span className="ml-2 text-gray-700">Intermediate</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-800">Urdu:</span>
                <span className="ml-2 text-gray-700">Native</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-800">Punjabi:</span>
                <span className="ml-2 text-gray-700">Conversational</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
