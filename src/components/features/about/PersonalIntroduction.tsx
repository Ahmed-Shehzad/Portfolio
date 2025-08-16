import { ScrollAnimationWrapper } from "@/wrappers";
import { memo } from "react";

export const PersonalIntroduction = memo(() => {
  return (
    <ScrollAnimationWrapper animation="fadeInUp" delay={150}>
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-300 to-sky-400 p-[1px]">
          <div className="rounded-3xl bg-gray-900 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="space-y-4">
                <h3 className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                  Backend Developer & Full Stack Technology Enthusiast
                </h3>
                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                  I&apos;m <strong className="text-white">Muhammad Ahmed Shehzad</strong>, a Backend
                  Developer specializing in building scalable, performance-driven server-side
                  applications and robust system architectures. While my core expertise lies in
                  backend development, I maintain proficiency across the full stack — enabling me to
                  deliver comprehensive solutions with clean architecture, maintainability, and
                  measurable business impact.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-emerald-400 md:text-xl">
                  The Journey That Shaped Me
                </h4>
                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                  My journey in tech started when I built my first interactive web page as a
                  teenager, fascinated by how a few lines of code could bring ideas to life. Over
                  the years, I&apos;ve transformed that curiosity into a professional skill set —
                  delivering solutions for startups, enterprises, and everything in between.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-sky-400 md:text-xl">
                  What Drives Me Today
                </h4>
                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                  I believe great software isn&apos;t just about functionality — it&apos;s about
                  creating experiences that users love and businesses can rely on. Whether it&apos;s
                  optimizing performance, implementing robust architecture, or crafting intuitive
                  interfaces, I approach every project with the same passion that got me started:
                  the excitement of solving complex problems through elegant code.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-amber-400 md:text-xl">
                  My Core Expertise & Approach
                </h4>
                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                  As a <strong className="text-white">Backend Developer</strong> at heart, my true
                  expertise lies in architecting robust server-side solutions, designing scalable
                  APIs, and building reliable data architectures. While I&apos;m proficient with
                  frontend technologies like React, TypeScript, and Tailwind CSS — they&apos;re
                  tools I can work with effectively rather than my primary specialization.
                </p>
                <p className="text-base leading-relaxed text-white/90 md:text-lg">
                  I&apos;m passionate about leveraging{" "}
                  <strong className="text-white">AI Assistant Programming</strong> as a powerful
                  pair programming partner. Using tools like{" "}
                  <strong className="text-white">GitHub Copilot</strong> and{" "}
                  <strong className="text-white">AWS CodeWhisperer</strong>, I combine AI efficiency
                  with solid engineering principles — accelerating development while maintaining
                  code quality and architectural integrity. Rather than relying on &ldquo;vibe
                  coding,&rdquo; I use these AI tools with deep understanding and intentionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
});

PersonalIntroduction.displayName = "PersonalIntroduction";
