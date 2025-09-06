/**
 * Resume Feature Types
 */

export type ResumeType = "frontend" | "backend" | "fullstack";

export interface ResumeConfig {
  type: ResumeType;
  title: string;
  description: string;
  skills: {
    primary: string[];
    secondary: string[];
    tools: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  achievements: string[];
  link?: string;
}

export interface ResumePageProps {
  params: Promise<{ locale: string; type: string }>;
}

export interface ResumeMetadata {
  title: string;
  description: string;
  keywords: readonly string[];
}
