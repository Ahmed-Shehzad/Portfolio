/**
 * Cover Letter Type Definitions
 */

export type CoverLetterType = "frontend" | "backend" | "fullstack";

export interface CoverLetterConfig {
  type: CoverLetterType;
  title: string;
  position: string;
  introduction: string;
  keyHighlights: string[];
  technicalExpertise: string[];
  achievements: string[];
  companyAlignment: string;
  valueProposition: string;
  closingStatement: string;
}

export interface CoverLetterMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface CoverLetterFormData {
  positionName: string;
  companyName: string;
  specificReason: string;
  salaryExpectations: string;
  expectedJoiningDate: string;
}
