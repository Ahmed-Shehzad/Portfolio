"use client";

import { usePortfolioProjects } from "@/features/portfolio/hooks";
import { useTranslations } from "next-intl";
import { Projects } from "../presentational/Projects";

/**
 * ProjectsContainer
 *
 * Container component that handles all business logic and data fetching for the projects section.
 *
 * Responsibilities:
 * - Fetch projects data using React Query
 * - Handle loading and error states
 * - Provide translations to the presentational component
 * - Manage data transformation and business logic
 */
export const ProjectsContainer = () => {
  const { data: portfolioProjects, isLoading, isError } = usePortfolioProjects();
  const t = useTranslations("projects");

  const translations = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    loading: t("loading"),
    error: t("error"),
    errorDescription: t("errorDescription"),
  };

  return (
    <Projects
      translations={translations}
      isLoading={isLoading}
      isError={isError}
      projects={portfolioProjects || null}
    />
  );
};
