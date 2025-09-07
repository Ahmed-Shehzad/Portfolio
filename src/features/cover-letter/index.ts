/**
 * Cover Letter Feature Exports
 */

export {
  COVER_LETTER_CONFIGS,
  COVER_LETTER_TYPES,
  COVER_LETTER_METADATA,
  getCoverLetterConfig,
} from "@/features/cover-letter/constants";
export type {
  CoverLetterConfig,
  CoverLetterType,
  CoverLetterMetadata,
  CoverLetterFormData,
} from "@/features/cover-letter/types";

// i18n
export { getLocalizedCoverLetterConfig, getLocalizedCoverLetterMetadata } from "./i18n";
