/**
 * Resume Feature Utilities
 */

import { RESUME_CONFIGS, RESUME_METADATA, RESUME_TYPES } from "./constants";
import type { ResumeType, ResumeConfig, ResumeMetadata } from "./types";

/**
 * Check if a resume type is valid
 */
export function isValidResumeType(type: string): type is ResumeType {
  return RESUME_TYPES.includes(type as ResumeType);
}

/**
 * Get resume configuration by type
 */
export function getResumeConfig(type: string): ResumeConfig | null {
  if (!isValidResumeType(type)) {
    return null;
  }
  return RESUME_CONFIGS[type] || null;
}

/**
 * Get resume metadata by type
 */
export function getResumeMetadata(type: string): ResumeMetadata | null {
  if (!isValidResumeType(type)) {
    return null;
  }
  return RESUME_METADATA[type] || null;
}
