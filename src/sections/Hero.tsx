"use client";

import ArrowDown from "@/assets/icons/arrow-down.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import StarIcon from "@/assets/icons/star.svg";
import { HeroOrbit, Portrait3D } from "@/components";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { memo, useCallback } from "react";

/**
 * HeroSection
 *
 * Above‑the‑fold introductory section presenting personal branding plus
 * immediate calls to action (explore projects / connect).
 *
 * Responsibilities:
 * - Layered orbital icon animation (<HeroOrbit />) isolated from normal flow.
 * - Semantic h1 and descriptive alt text for avatar / portrait imagery.
 * - Smooth in‑page navigation using scrollIntoView (progressive enhancement friendly).
 * - Priority optimized images for critical visual assets.
 *
 * Performance:
 * - Memoized (React.memo) – static interior; no props.
 * - Stable handlers with useCallback prevent needless child re-renders.
 * - Absolutely positioned animation layer minimizes layout / paint cost.
 *
 * Accessibility:
 * - Clear button labels (emojis are supplementary only).
 * - Thoughtful alt text avoids redundancy and conveys context.
 */
export const HeroSection = memo(() => {
  const t = useTranslations("hero");
  const handleConnectClick = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleExploreClick = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative z-0 container overflow-x-clip py-32 md:px-24 md:py-48 lg:py-60"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div className="hero-ring size-[620px]" />
        <div className="hero-ring size-[820px]" />
        <div className="hero-ring size-[1020px]" />
        <div className="hero-ring size-[1220px]" />
        <div className="hero-ring size-[1480px]" />

        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-8 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-5 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-41}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-2 rounded-full text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-10 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-violet-400" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-violet-400" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-28 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-14 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={720}
          rotation={85}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-3 text-violet-400/30" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-3 text-violet-400" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="50s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-[28px] text-violet-400" />
        </HeroOrbit>
      </div>
      <div className="relative z-10 container">
        <motion.div
          className="mx-auto max-w-lg p-8 md:max-w-2xl lg:max-w-5xl"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-panel text-ink container rounded-4xl p-8 pt-2 transition-shadow duration-300 hover:shadow-[0_26px_60px_-24px_rgba(103,110,176,0.6)]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 translate-y-2 transform rounded-full bg-gradient-to-b from-transparent to-indigo-500/30 blur-lg" />
                <Portrait3D
                  alt="Muhammad Ahmed Shehzad - Professional headshot of a full-stack developer"
                  className="z-10"
                  width={150}
                  height={150}
                />
              </div>
              <div className="text-center md:text-right">
                <h1 className="text-ink font-serif text-3xl tracking-wide md:text-5xl">
                  <span className="block">{t("name")}</span>
                </h1>
                <div className="glass-pill mt-3 inline-flex items-center gap-4 px-4 py-1.5">
                  <div className="relative size-2.5 rounded-full bg-green-500">
                    <div className="animation-ping absolute inset-0 rounded-full bg-green-500" />
                  </div>
                  <div className="text-ink-soft text-sm font-medium">{t("availability")}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-ink-soft mt-4 text-center md:text-lg">{t("description")}</p>
        </motion.div>
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={handleExploreClick}
            className="glass-pill text-ink inline-flex h-12 cursor-pointer items-center gap-2 px-6"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-semibold">{t("buttons.explore")}</span>
            <ArrowDown className="size-4" />
          </motion.button>
          <motion.button
            onClick={handleConnectClick}
            className="accent-pill inline-flex h-12 cursor-pointer items-center gap-2 px-6"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>👋</span>
            <span className="font-semibold">{t("buttons.connect")}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
