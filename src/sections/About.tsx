"use client";

import BookImage from "@/assets/images/book-cover.png";
import SmileMemoji from "@/assets/images/memoji-smile.png";
import { Card, CardHeader, OptimizedImage, SectionHeader } from "@/components/ui";
import { ScrollAnimationWrapper } from "@/wrappers";
import dynamic from "next/dynamic";
import { memo } from "react";
import { MAP_CONFIG } from "@/shared/constants";
// Lazy load heavy components
const DynamicMap = dynamic(
  () => import("@/components/features").then((mod) => ({ default: mod.DynamicMap })),
  {
    loading: () => <div className="h-full animate-pulse rounded-lg bg-gray-700" />,
    ssr: false,
  }
);

// Lazy load heavy components with data
const LazyToolboxItems = dynamic(
  () =>
    Promise.all([
      import("@/components/features").then((mod) => mod.ToolboxItems),
      import("@/shared/constants").then((mod) => mod.TOOLBOX_ITEMS),
    ]).then(([ToolboxItemsComponent, toolboxItems]) => {
      const ToolboxWithData = (props: any) => (
        <ToolboxItemsComponent items={toolboxItems} {...props} />
      );
      return { default: ToolboxWithData };
    }),
  {
    loading: () => <div className="h-24 animate-pulse rounded-lg bg-gray-700" />,
    ssr: true,
  }
);

/**
 * AboutSection
 *
 * Multi‑segment narrative & capability overview: intro, differentiators, core
 * values, location map, strengths, personal interests.
 *
 * Composition:
 * - Code‑split heavy / optional UI (map, toolbox) with next/dynamic.
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
  return (
    <section id="about" className="py-20 md:px-24 lg:py-28">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            eyebrow="About Me"
            title="My Journey as a Developer"
            description="From curiosity to expertise - discover what drives my passion for building exceptional digital experiences."
          />
        </ScrollAnimationWrapper>

        {/* Personal Introduction */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={150}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-3xl bg-gradient-to-r from-emerald-300 to-sky-400 p-[1px]">
              <div className="rounded-3xl bg-gray-900 p-8 md:p-10">
                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="space-y-4">
                    <h3 className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                      Full Stack Developer & Technology Enthusiast
                    </h3>
                    <p className="text-base leading-relaxed text-white/90 md:text-lg">
                      I&apos;m <strong className="text-white">Muhammad Ahmed Shehzad</strong>, a
                      Full Stack Developer specializing in building scalable, performance-driven
                      applications with modern web technologies. My expertise spans front-end,
                      back-end, DevOps, and cloud infrastructure — with a strong focus on clean
                      architecture, maintainability, and delivering measurable business impact.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-emerald-400 md:text-xl">
                      The Journey That Shaped Me
                    </h4>
                    <p className="text-base leading-relaxed text-white/90 md:text-lg">
                      My journey in tech started when I built my first interactive web page as a
                      teenager, fascinated by how a few lines of code could bring ideas to life.
                      Over the years, I&apos;ve transformed that curiosity into a professional skill
                      set — delivering solutions for startups, enterprises, and everything in
                      between.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-sky-400 md:text-xl">
                      What Drives Me Today
                    </h4>
                    <p className="text-base leading-relaxed text-white/90 md:text-lg">
                      I believe great software isn&apos;t just about functionality — it&apos;s about
                      creating experiences that users love and businesses can rely on. Whether
                      it&apos;s optimizing performance, implementing robust architecture, or
                      crafting intuitive interfaces, I approach every project with the same passion
                      that got me started: the excitement of solving complex problems through
                      elegant code.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                      <span>🚀</span> Performance Optimized
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-400">
                      <span>🏗️</span> Scalable Architecture
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
                      <span>💡</span> Innovation Focused
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        <div className="mt-20 flex flex-col gap-8">
          <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-semibold md:text-3xl">What Sets Me Apart</h3>
              <p className="mx-auto max-w-2xl text-white/70">
                Beyond technical skills, here&apos;s what makes me a valuable partner for your
                projects
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            {/* Professional Growth Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={300}
              threshold={0.2}
              className="h-[320px] md:col-span-2 lg:col-span-1"
            >
              <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                <CardHeader
                  title="Continuous Learning"
                  description="I stay ahead of industry trends through constant learning and hands-on practice."
                />
                <div className="mx-auto mt-2 w-40 md:mt-0">
                  <OptimizedImage
                    src={BookImage}
                    alt="Professional Development Books"
                    width={160}
                    height={200}
                  />
                </div>
                <div className="mt-4 px-6 text-center text-sm text-white/60">
                  Currently exploring: Next.js 15, React 19, and modern DevOps practices
                </div>
              </Card>
            </ScrollAnimationWrapper>

            {/* Technical Arsenal Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={150}
              threshold={0.2}
              className="h-[320px] md:col-span-3 lg:col-span-2"
            >
              <Card className="h-[320px] md:col-span-3 lg:col-span-2">
                <CardHeader
                  title="Technical Arsenal"
                  description="The carefully curated tools and technologies I leverage to build exceptional digital experiences."
                />
                <LazyToolboxItems
                  className="mt-6"
                  itemsWrapperClassName="-translate-x-1/3 md:-translate-x-1 md:gap-8 animate-[move-right_10s_linear_infinite] hover:[animation-play-state:paused]"
                />
              </Card>
            </ScrollAnimationWrapper>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            {/* Core Values Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={300}
              threshold={0.2}
              className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2"
            >
              <Card className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2">
                <CardHeader
                  className="px-6 py-6"
                  title="Core Values"
                  description="The principles that drive my approach to development and collaboration."
                />
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Quality First */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-300 to-sky-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>🎯</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Quality First</div>
                          <div className="text-xs text-gray-700">Clean, maintainable code</div>
                        </div>
                      </div>
                    </div>

                    {/* Innovation */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-purple-300 to-pink-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>🚀</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Innovation</div>
                          <div className="text-xs text-gray-700">Pushing boundaries daily</div>
                        </div>
                      </div>
                    </div>

                    {/* Collaboration */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-orange-300 to-red-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>🤝</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Collaboration</div>
                          <div className="text-xs text-gray-700">Team success over solo wins</div>
                        </div>
                      </div>
                    </div>

                    {/* Excellence */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-300 to-amber-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>⭐</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Excellence</div>
                          <div className="text-xs text-gray-700">Exceeding expectations always</div>
                        </div>
                      </div>
                    </div>

                    {/* Reliability */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-300 to-violet-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>🛡️</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Reliability</div>
                          <div className="text-xs text-gray-700">
                            Consistent delivery you can trust
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Growth */}
                    <div className="w-full">
                      <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-blue-300 to-cyan-300 px-4 py-3 transition-transform hover:scale-105">
                        <span>📚</span>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-950">Growth</div>
                          <div className="text-xs text-gray-700">
                            Always learning, always improving
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollAnimationWrapper>

            {/* Map/Location Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={450}
              threshold={0.2}
              className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1"
            >
              <Card className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1">
                <DynamicMap
                  center={MAP_CONFIG.CENTER}
                  zoom={MAP_CONFIG.ZOOM}
                  markerImage={SmileMemoji}
                />
              </Card>
            </ScrollAnimationWrapper>
          </div>
        </div>

        {/* Core Strengths Section */}
        <div className="mt-20 flex flex-col gap-8">
          <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-semibold md:text-3xl">Core Strengths</h3>
              <p className="mx-auto max-w-2xl text-white/70">
                My professional focus areas where I deliver exceptional results
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl bg-gradient-to-r from-purple-300 to-pink-300 p-[1px]">
                <div className="rounded-3xl bg-gray-900 p-8 md:p-10">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-2xl">🎨</span>
                        <div>
                          <h4 className="mb-2 font-semibold text-white">
                            Pixel-Perfect UI Development
                          </h4>
                          <p className="text-sm text-white/80">
                            Crafting pixel-perfect UI with React, TypeScript, and Tailwind CSS
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-2xl">🏗️</span>
                        <div>
                          <h4 className="mb-2 font-semibold text-white">
                            Scalable Backend Architecture
                          </h4>
                          <p className="text-sm text-white/80">
                            Architecting scalable backends with .NET 8, PostgreSQL, and
                            microservices
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-2xl">🚀</span>
                        <div>
                          <h4 className="mb-2 font-semibold text-white">DevOps & Automation</h4>
                          <p className="text-sm text-white/80">
                            Implementing CI/CD pipelines and DevOps automation using Docker,
                            Kubernetes, and AWS
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-2xl">📐</span>
                        <div>
                          <h4 className="mb-2 font-semibold text-white">
                            Clean Architecture Patterns
                          </h4>
                          <p className="text-sm text-white/80">
                            Applying Domain-Driven Design (DDD), CQRS, and Vertical Slice
                            Architecture for maintainable codebases
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-2xl">⚡</span>
                        <div>
                          <h4 className="mb-2 font-semibold text-white">
                            Performance Optimization
                          </h4>
                          <p className="text-sm text-white/80">
                            Optimizing performance — from reducing page load times by 50% to scaling
                            services for high traffic
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Beyond Work Section */}
        <div className="mt-20 flex flex-col gap-8">
          <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-semibold md:text-3xl">Beyond Work</h3>
              <p className="mx-auto max-w-2xl text-white/70">
                The human side that brings creativity and fresh perspective to my work
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl bg-gradient-to-r from-orange-300 to-red-300 p-[1px]">
                <div className="rounded-3xl bg-gray-900 p-8 md:p-10">
                  <div className="text-center">
                    <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                      &ldquo;When I&apos;m not coding, you&apos;ll probably find me hiking scenic
                      trails, capturing landscapes through photography, or diving into books on
                      technology, psychology, and business. I also enjoy experimenting in the
                      kitchen — though my pull requests are much cleaner than my spice
                      cabinet.&rdquo;
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
                        <span>🥾</span> Hiking Adventures
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                        <span>📸</span> Landscape Photography
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400">
                        <span>📚</span> Continuous Reading
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                        <span>👨‍🍳</span> Kitchen Experiments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
