/**
 * Portfolio Feature Types
 *
 * Type definitions for the portfolio/projects feature.
 * Merged types from both portfolio and projects features for bulletproof architecture.
 */

import { StaticImageData } from "next/image";

// Portfolio/Resume specific types
export interface ProjectResult {
  readonly title: string;
}

export interface PortfolioProject {
  readonly company: string;
  readonly year: string;
  readonly title: string;
  readonly results: readonly ProjectResult[];
  readonly link: string;
  readonly image: StaticImageData;
  readonly imageWidth: number;
  readonly imageHeight: number;
}

// Generic project types (for other uses)
export interface ProjectLink {
  href: string;
  [k: string]: unknown;
}

export interface ProjectImage {
  width: number;
  height: number;
  [k: string]: unknown;
}

export interface Project {
  title: string;
  technologies: string[];
  image: ProjectImage;
  links: ProjectLink[];
  [k: string]: unknown;
}

export interface OptimizedProject extends Project {
  technologyChips: Array<{ name: string; color: string; index: number; key: string }>;
  imageData: { width: number; height: number; aspectRatio: number; placeholder: string };
  secureLinks: Array<{ href: string; rel?: string; target: string }>;
}
