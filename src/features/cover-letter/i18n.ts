/**
 * Cover Letter Localization Utilities
 */

import { getTranslations } from "next-intl/server";
import type { CoverLetterConfig, CoverLetterType } from "./types";
import { COVER_LETTER_CONFIGS } from "./constants";

/**
 * Get localized cover letter configuration
 */
export async function getLocalizedCoverLetterConfig(
  type: CoverLetterType,
  _locale: string
): Promise<CoverLetterConfig> {
  const baseConfig = COVER_LETTER_CONFIGS[type];

  if (!baseConfig) {
    throw new Error(`Cover letter config not found for type: ${type}`);
  }

  // For now, we'll return the base config since the cover letter content
  // is primarily in English and the localization is handled through the translations
  // This can be extended later to support fully localized cover letter content
  return {
    ...baseConfig,
    // Override with any localized content if needed
    title: baseConfig.title,
    position: baseConfig.position,
  };
}

/**
 * Get localized cover letter metadata
 */
export async function getLocalizedCoverLetterMetadata(type: CoverLetterType, locale: string) {
  const t = await getTranslations({ locale, namespace: "coverLetter" });

  return {
    title: t("metadata.title", { type }),
    description: t("metadata.description", { type }),
  };
}
