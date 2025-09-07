/**
 * Resume Feature Types
 */

export type ResumeType = "frontend" | "backend" | "fullstack";

export interface ResumeConfig {
  type: ResumeType;
  title: string;
  description: string;
  summary?: string;
  skills: {
    primary?: string[];
    secondary?: string[];
    tools?: string[];
    frontend?: string[];
    backend?: string[];
    development?: string[];
    testing?: string[];
    devops?: string[];
    cloud?: string[];
    databases?: string[];
    architecture?: string[];
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
