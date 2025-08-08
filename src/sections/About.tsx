"use client";

import BookImage from "@/assets/images/book-cover.png";
import SmileMemoji from "@/assets/images/memoji-smile.png";
import { DynamicMap, ToolboxItems } from "@/components/features";
import { Card, CardHeader, SectionHeader } from "@/components/ui";
import { HOBBIES, MAP_CONFIG, TOOLBOX_ITEMS } from "@/shared/constants";
import { ScrollAnimationWrapper } from "@/wrappers";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:px-24 lg:py-28">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            eyebrow="About Me"
            title="A Glimpse Into My World"
            description="Learn more about who I am, what I do, and what inspires me."
          />
        </ScrollAnimationWrapper>

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            {/* My Reads Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={0}
              threshold={0.2}
              className="h-[320px] md:col-span-2 lg:col-span-1"
            >
              <Card className="h-[320px] md:col-span-2 lg:col-span-1">
                <CardHeader
                  title="My Reads"
                  description="Explore the books shaping my experiences."
                />
                <div className="mx-auto mt-2 w-40 md:mt-0">
                  <Image src={BookImage} alt="Book Cover" />
                </div>
              </Card>
            </ScrollAnimationWrapper>

            {/* My Toolbox Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={150}
              threshold={0.2}
              className="h-[320px] md:col-span-3 lg:col-span-2"
            >
              <Card className="h-[320px] md:col-span-3 lg:col-span-2">
                <CardHeader
                  title="My Toolbox"
                  description="Explore the technologies and tools used to craft digital experiences."
                />
                <ToolboxItems
                  items={TOOLBOX_ITEMS}
                  className="mt-6"
                  itemsWrapperClassName="-translate-x-1/3 md:-translate-x-1 md:gap-8 animate-[move-right_10s_linear_infinite] hover:[animation-play-state:paused]"
                />
              </Card>
            </ScrollAnimationWrapper>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            {/* Beyond the Code Card */}
            <ScrollAnimationWrapper
              animation="fadeInUp"
              delay={300}
              threshold={0.2}
              className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2"
            >
              <Card className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2">
                <CardHeader
                  className="px-6 py-6"
                  title="Beyond the Code"
                  description="Explore my interests and hobbies beyond the digital realm."
                />
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {HOBBIES.map((hobby) => (
                      <div
                        key={hobby.title}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm transition-transform hover:scale-105"
                      >
                        <span>{hobby.emoji}</span>
                        <span className="font-medium text-gray-950">{hobby.title}</span>
                      </div>
                    ))}
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
      </div>
    </section>
  );
};
