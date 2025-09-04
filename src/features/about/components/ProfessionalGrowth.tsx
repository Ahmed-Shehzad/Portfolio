import BookImage from "@/assets/images/book-cover.png";
import { Card, CardHeader, OptimizedImage } from "@/components";
import { ScrollAnimationWrapper } from "@/wrappers";
import dynamic from "next/dynamic";
import { memo } from "react";

// Lazy load heavy components with data
const LazyToolboxItems = dynamic(
  () =>
    Promise.all([
      import("..").then((mod) => mod.ToolboxItems),
      import("@/shared/constants").then((mod) => mod.TOOLBOX_ITEMS),
    ]).then(([ToolboxItemsComponent, toolboxItems]) => {
      interface ComponentProps {
        className?: string;
        itemsWrapperClassName?: string;
      }
      const ToolboxWithData = (props: ComponentProps) => (
        <ToolboxItemsComponent items={toolboxItems} {...props} />
      );
      return { default: ToolboxWithData };
    }),
  {
    loading: () => <div className="h-24 animate-pulse rounded-lg bg-gray-700" />,
    ssr: true,
  }
);

export const ProfessionalGrowth = memo(() => {
  return (
    <div className="mt-20 flex flex-col gap-8">
      <ScrollAnimationWrapper animation="fadeInUp" delay={250}>
        <div className="mb-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold md:text-3xl">What Sets Me Apart</h3>
          <p className="mx-auto max-w-2xl text-white/70">
            Beyond technical skills, here&apos;s what makes me a valuable partner for your projects
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
    </div>
  );
});

ProfessionalGrowth.displayName = "ProfessionalGrowth";
