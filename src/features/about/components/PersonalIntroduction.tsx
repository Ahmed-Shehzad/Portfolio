import { ScrollAnimationWrapper } from "@/wrappers";
import { useTranslations } from "next-intl";
import { memo } from "react";

// Helper component for strong text formatting
const StrongText = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export const PersonalIntroduction = memo(() => {
  const t = useTranslations("about.personalIntroduction");
  return (
    <ScrollAnimationWrapper animation="fadeInUp" delay={150}>
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-violet-500 to-sky-500 p-[1px]">
          <div className="rounded-3xl bg-white/45 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="space-y-4">
                <h3 className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
                  {t("title")}
                </h3>
                <p className="text-ink-soft text-base leading-relaxed md:text-lg">
                  {t.rich("intro", {
                    strong: StrongText,
                  })}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-violet-500 md:text-xl">
                  {t("journey.title")}
                </h4>
                <p className="text-ink-soft text-base leading-relaxed md:text-lg">
                  {t("journey.description")}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-sky-400 md:text-xl">
                  {t("drives.title")}
                </h4>
                <p className="text-ink-soft text-base leading-relaxed md:text-lg">
                  {t("drives.description")}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-amber-400 md:text-xl">
                  {t("expertise.title")}
                </h4>
                <p className="text-ink-soft text-base leading-relaxed md:text-lg">
                  {t.rich("expertise.description1", {
                    strong: StrongText,
                  })}
                </p>
                <p className="text-ink-soft text-base leading-relaxed md:text-lg">
                  {t.rich("expertise.description2", {
                    strong: StrongText,
                  })}
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
