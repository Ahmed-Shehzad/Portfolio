"use client";

import { SectionHeader } from "@/components/ui";
import { ScrollAnimationWrapper } from "@/wrappers";
import { useTranslations } from "next-intl";
import { memo } from "react";
import {
  PersonalIntroduction,
  ProfessionalGrowth,
  CoreValues,
  CoreStrengths,
  BeyondWork,
} from "@/features/about";

/**
 * AboutSection
 *
 * Multi‑segment narrative & capability overview: intro, differentiators, core
 * values, location map, strengths, personal interests.
 *
 * Composition:
 * - Extracted into modular components for better maintainability
 * - ScrollAnimationWrapper provides staggered entrance (perceived performance boost).
 * - Consistent Card framing & gradient borders unify presentation.
 * - Toolbox data hydrated lazily with constants to keep initial bundle lean.
 *
 * Performance:
 * - Memoized (no props) + dynamic imports defer non-critical bytes.
 * - OptimizedImage handles responsive assets (sizing + modern formats).
 *
 * Accessibility:
 * - Logical heading hierarchy (h3/h4) within a single section landmark.
 * - Badges remain textual (emoji + text) – not color‑only signals.
 * - Animation wrappers preserve DOM order for assistive tech.
 */
export const AboutSection = memo(() => {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 md:px-24 lg:py-28">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        </ScrollAnimationWrapper>

        <div className="space-y-16">
          <PersonalIntroduction />
          <ProfessionalGrowth />
          <CoreValues />
          <CoreStrengths />
          <BeyondWork />
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
