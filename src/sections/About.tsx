import CSharpIcon from "@/assets/icons/csharp.svg";
import DockerIcon from "@/assets/icons/docker.svg";
import DotnetIcon from "@/assets/icons/dotnet.svg";
import NextJsIcon from "@/assets/icons/next-js.svg";
import NpgsqlIcon from "@/assets/icons/postgresql.svg";
import ReactIcon from "@/assets/icons/react.svg";
import TypeScriptIcon from "@/assets/icons/square-ts.svg";
import TailwindIcon from "@/assets/icons/tailwind.svg";
import BookImage from "@/assets/images/book-cover.png";
import SmileMemoji from "@/assets/images/memoji-smile.png";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import { DynamicMap } from "@/components/DynamicMap";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import Image from "next/image";

type ToolboxItem = {
  title: string;
  iconType: React.ElementType;
};

const toolboxItems: ToolboxItem[] = [
  {
    title: "TypeScript",
    iconType: TypeScriptIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "Next.js",
    iconType: NextJsIcon,
  },
  {
    title: "PostgreSQL",
    iconType: NpgsqlIcon,
  },
  {
    title: "Tailwind CSS",
    iconType: TailwindIcon,
  },
  {
    title: "C#",
    iconType: CSharpIcon,
  },
  {
    title: ".NET",
    iconType: DotnetIcon,
  },
  {
    title: "Docker",
    iconType: DockerIcon,
  },
];

type Hobby = {
  title: string;
  emoji: string;
};

const hobbies: Hobby[] = [
  {
    title: "Reading",
    emoji: "📖",
  },
  {
    title: "Writing",
    emoji: "✍️",
  },
  {
    title: "Hiking",
    emoji: "🥾",
  },
  {
    title: "Cooking",
    emoji: "🍳",
  },
  {
    title: "Gaming",
    emoji: "🎮",
  },
  {
    title: "Traveling",
    emoji: "✈️",
  },
  {
    title: "Photography",
    emoji: "📷",
  },
  {
    title: "Learning",
    emoji: "🧠",
  },
  {
    title: "Music",
    emoji: "🎵",
  },
];

export const AboutSection = () => {
  return (
    <div id="about" className="py-20 md:px-24 lg:py-28">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            title="A Glimpse into my world"
            description="Learn more about who I am, what I do, and what inspires me."
            eyebrow="About Me"
          />
        </ScrollAnimationWrapper>
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <ScrollAnimationWrapper animation="fadeInLeft" delay={200}>
                <CardHeader
                  title="My Reads"
                  description="Explore the books shaping my experiences."
                />
                <div className="mx-auto mt-2 w-40 md:mt-0">
                  <Image src={BookImage} alt="Book Cover" />
                </div>
              </ScrollAnimationWrapper>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <ScrollAnimationWrapper animation="fadeInRight" delay={400}>
                <CardHeader
                  className=""
                  title="My Toolbox"
                  description="Explore the technologies and tools used to craft digital
                  experiences."
                />
                <ToolboxItems
                  items={toolboxItems}
                  className="mt-6"
                  itemsWrapperClassName="-translate-x-1/3 md:-translate-x-1 md:gap-8 animate-[move-right_10s_linear_infinite] hover:[animation-play-state:paused]"
                />
              </ScrollAnimationWrapper>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2">
              <ScrollAnimationWrapper animation="fadeInLeft" delay={200}>
                <CardHeader
                  className="px-6 py-6"
                  title="Beyond the Code"
                  description="Explore my interests and hobbies beyond the digital realm."
                />
              </ScrollAnimationWrapper>
              <div className="flex-1 p-6">
                <ScrollAnimationWrapper animation="fadeIn" delay={400} className="h-full w-full">
                  <div className="grid h-full grid-cols-2 content-start gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
                    {hobbies.map((hobby) => {
                      return (
                        <div
                          key={hobby.title}
                          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-3 py-1.5 text-xs font-medium text-gray-950 transition-all duration-300 hover:scale-105 hover:shadow-md md:gap-2 md:px-4 md:py-2 md:text-sm"
                        >
                          <span className="text-sm md:text-base">{hobby.emoji}</span>
                          <span className="whitespace-nowrap">{hobby.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </ScrollAnimationWrapper>
              </div>
            </Card>
            <Card className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1">
              <ScrollAnimationWrapper animation="scaleIn" delay={400} className="h-full w-full">
                <DynamicMap center={[50.0782, 8.2398]} zoom={13} markerImage={SmileMemoji} />
              </ScrollAnimationWrapper>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
