import SmileMemoji from "@/assets/images/memoji-smile.png";
import { Card, CardHeader } from "@/components/ui";
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

export const CoreValues = memo(() => {
  return (
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
                    <div className="text-xs text-gray-700">Consistent delivery you can trust</div>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="w-full">
                <div className="flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-blue-300 to-cyan-300 px-4 py-3 transition-transform hover:scale-105">
                  <span>📚</span>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-950">Growth</div>
                    <div className="text-xs text-gray-700">Always learning, always improving</div>
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
          <DynamicMap center={MAP_CONFIG.CENTER} zoom={MAP_CONFIG.ZOOM} markerImage={SmileMemoji} />
        </Card>
      </ScrollAnimationWrapper>
    </div>
  );
});

CoreValues.displayName = "CoreValues";
