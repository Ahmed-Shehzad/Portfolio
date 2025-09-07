/**
 * Resume Localization Utilities
 */

import { getTranslations } from "next-intl/server";
import type { ResumeConfig, ResumeType } from "./types";
import { RESUME_CONFIGS } from "./constants";

/**
 * Get localized resume configuration
 */
export async function getLocalizedResumeConfig(
  type: ResumeType,
  locale: string
): Promise<ResumeConfig> {
  const t = await getTranslations({ locale, namespace: "resume" });
  const baseConfig = RESUME_CONFIGS[type];

  if (!baseConfig) {
    throw new Error(`Resume config not found for type: ${type}`);
  }

  // Create localized config with translations
  const localizedConfig: ResumeConfig = {
    type: baseConfig.type,
    title: t(`configs.${type}.title`),
    description: t(`configs.${type}.description`),
    summary: t(`configs.${type}.summary`),
    skills: baseConfig.skills, // Skills remain in English for now as they are technical terms
    experience: baseConfig.experience.map((exp) => ({
      ...exp,
      // Company names, positions, and durations are translated
      company: t(`companies.${getCompanyKey(exp.company)}`),
      position: t(`positions.${getPositionKey(exp.position)}`),
      duration: t(`durations.${getDurationKey(exp.company)}`),
      // Achievements and technologies remain in English for technical accuracy
      achievements: exp.achievements,
      technologies: exp.technologies,
    })),
    projects: baseConfig.projects, // Projects remain in English for now
  };

  return localizedConfig;
}

/**
 * Get localized resume metadata
 */
export async function getLocalizedResumeMetadata(type: ResumeType, locale: string) {
  const t = await getTranslations({ locale, namespace: "resume" });

  return {
    title: t(`metadata.${type}.title`),
    description: t(`metadata.${type}.description`),
    keywords: t(`metadata.${type}.keywords`).split(","),
  };
}

/**
 * Helper functions to convert company names to translation keys
 */
function getCompanyKey(companyName: string): string {
  const keyMap: Record<string, string> = {
    "Verbund Pflegehilfe e.V.": "verbund_pflegehilfe",
    "Sustayn GmbH": "sustayn_gmbh",
    "FPT Software": "fpt_software",
    "SODEFA GmbH Co. & KG": "sodefa_gmbh",
    "Cybersoft North America Inc.": "cybersoft_north_america",
    "Six Logics": "six_logics",
  };

  return keyMap[companyName] || companyName.toLowerCase().replace(/\s+/g, "_");
}

/**
 * Helper function to convert position names to translation keys
 */
function getPositionKey(positionName: string): string {
  const keyMap: Record<string, string> = {
    "Senior Software Engineer": "senior_software_engineer",
    "Software Engineer": "software_engineer",
    "Frontend Developer": "frontend_developer",
    "Software Developer": "software_developer",
    "Full-Stack Software Engineer": "full_stack_developer",
  };

  return keyMap[positionName] || positionName.toLowerCase().replace(/\s+/g, "_");
}

/**
 * Helper function to get duration key based on company (reuses company key mapping)
 */
function getDurationKey(companyName: string): string {
  return getCompanyKey(companyName);
}
