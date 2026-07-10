import { ScrollAnimationWrapper } from "@/wrappers";
import { memo } from "react";

export const BeyondWork = memo(() => {
  return (
    <div className="mt-20 flex flex-col gap-8">
      <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
        <div className="mb-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold md:text-3xl">Beyond Work</h3>
          <p className="text-ink-soft mx-auto max-w-2xl">
            The human side that brings creativity and fresh perspective to my work
          </p>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper animation="fadeInUp" delay={300}>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl">
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="text-center">
                <p className="text-ink-soft text-lg leading-relaxed md:text-xl">
                  &ldquo;When I&apos;m not coding, you&apos;ll probably find me hiking scenic
                  trails, capturing landscapes through photography, or diving into books on
                  technology, psychology, and business. I also enjoy experimenting in the kitchen —
                  though my pull requests are much cleaner than my spice cabinet.&rdquo;
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
  );
});

BeyondWork.displayName = "BeyondWork";
