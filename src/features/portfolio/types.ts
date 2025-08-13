/**
 * Portfolio Feature Types
 *
 * Type definitions for the portfolio/projects feature.
 */

import { StaticImageData } from "next/image";

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

export interface ProjectCardProps {
  readonly project: PortfolioProject;
  readonly className?: string;
}

export interface ProjectsListProps {
  readonly projects: readonly PortfolioProject[];
  readonly className?: string;
}

export interface ProjectResultProps {
  readonly result: ProjectResult;
  readonly index: number;
}
