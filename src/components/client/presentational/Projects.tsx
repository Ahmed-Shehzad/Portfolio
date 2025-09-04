"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { Card, OptimizedImage, SectionHeader } from "@/components";
import { ScrollAnimationWrapper } from "@/wrappers";
import { FC } from "react";
import type { PortfolioProject } from "@/features/portfolio/types";

interface ProjectsProps {
  /** Translated strings for the projects section */
  translations: {
    eyebrow: string;
    title: string;
    description: string;
    loading: string;
    error: string;
    errorDescription: string;
  };
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  isError: boolean;
  /** Projects data */
  projects: PortfolioProject[] | null;
}

/**
 * Projects Component
 *
 * Pure presentational component that renders the projects section UI.
 * Contains no business logic or data fetching.
 *
 * Responsibilities:
 * - Render projects layout with different states (loading, error, success)
 * - Display project cards with proper styling and animations
 * - Handle responsive design and accessibility
 * - Provide visual feedback for different states
 */
export const Projects: FC<ProjectsProps> = ({ translations, isLoading, isError, projects }) => {
  // Loading state
  if (isLoading) {
    return (
      <section id="projects" className="pb-16 md:px-24 lg:py-24">
        <div className="container">
          <ScrollAnimationWrapper animation="fadeInUp">
            <SectionHeader
              eyebrow={translations.eyebrow}
              title={translations.title}
              description={translations.description}
            />
          </ScrollAnimationWrapper>
          <div className="mt-10 flex items-center justify-center md:mt-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-300 border-r-transparent" />
              <p className="mt-4 text-white/60">{translations.loading}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError || !projects) {
    return (
      <section id="projects" className="pb-16 md:px-24 lg:py-24">
        <div className="container">
          <ScrollAnimationWrapper animation="fadeInUp">
            <SectionHeader
              eyebrow={translations.eyebrow}
              title={translations.title}
              description={translations.description}
            />
          </ScrollAnimationWrapper>
          <div className="mt-10 flex items-center justify-center md:mt-20">
            <div className="text-center">
              <p className="text-red-400">{translations.error}</p>
              <p className="mt-2 text-white/60">{translations.errorDescription}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Success state with projects
  return (
    <section id="projects" className="pb-16 md:px-24 lg:py-24">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            eyebrow={translations.eyebrow}
            title={translations.title}
            description={translations.description}
          />
        </ScrollAnimationWrapper>
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {projects.map((project, projectIndex) => {
            const stickyOffset = `calc(64px + ${projectIndex * 40}px)`;

            return (
              <Card
                key={project.title}
                className="sticky px-8 pt-8 pb-0 md:px-10 md:pt-12 lg:px-20 lg:pt-16"
                style={{ top: stickyOffset }}
              >
                <ScrollAnimationWrapper
                  animation="fadeInUp"
                  delay={projectIndex * 150}
                  threshold={0.2}
                  className="h-full"
                >
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    <div className="lg:pb-16">
                      <div className="inline-flex bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase">
                        {project.company} &bull; {project.year}
                      </div>
                      <h3 className="mt-2 font-serif text-2xl md:mt-5 md:text-4xl">
                        {project.title}
                      </h3>
                      <hr className="mt-4 border-t-2 border-white/5 md:mt-5" />
                      <ul className="mt-4 flex flex-col gap-4 md:mt-5">
                        {project.results.map((result) => (
                          <li
                            key={result.title}
                            className="flex gap-2 text-sm text-white/50 md:text-base"
                          >
                            <CheckCircleIcon className="size-5 md:size-6" />
                            <span>{result.title}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        <button className="mt-8 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-400/20 bg-neutral-400/20 px-6 font-semibold backdrop-blur-[1px] transition-all duration-300 text-shadow-white hover:bg-neutral-400/30 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)] md:w-auto">
                          <span>View Project</span>
                          <ArrowUpRightIcon className="size-4" />
                        </button>
                      </a>
                    </div>
                    {/* Visual preview frame: maintain aspect ratio on tablets (e.g., iPad Pro 11"/12.9") */}
                    <div className="relative mt-8 h-56 w-full overflow-hidden rounded-2xl sm:h-60 md:aspect-[158/100] md:h-auto lg:mt-0 lg:aspect-auto lg:h-[400px]">
                      <figure
                        className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/70 px-2 pt-5 pb-3 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/5 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50 sm:px-3 sm:pt-6 sm:pb-4"
                        aria-label={`${project.title} preview in MacBook frame`}
                      >
                        {/* Camera notch / bezel indicator */}
                        <div
                          className="pointer-events-none absolute top-1.5 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-black/40 sm:w-24"
                          aria-hidden="true"
                        />
                        <div className="relative flex-grow overflow-hidden rounded-lg ring-1 ring-white/10">
                          <OptimizedImage
                            src={project.image}
                            alt={`${project.title} screenshot showcasing the ${project.company} project from ${project.year}`}
                            width={project.imageWidth}
                            height={project.imageHeight}
                            className="h-full w-full object-cover"
                            priority={projectIndex === 0}
                            quality={90}
                            placeholder="blur"
                            sizes="(min-width:1280px) 600px, (min-width:1024px) 50vw, 100vw"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </div>
                        {/* Bottom base / stand */}
                        <div
                          className="pointer-events-none mx-auto mt-2 h-1.5 w-28 rounded-full bg-gradient-to-r from-neutral-500/40 via-neutral-400/30 to-neutral-500/40 sm:mt-3 sm:w-32"
                          aria-hidden="true"
                        />
                      </figure>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
