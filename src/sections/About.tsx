import Image from "next/image";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import BookImage from "@/assets/images/book-cover.png";
import SmileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import DotnetIcon from "@/assets/icons/dotnet.svg";
import TypeScriptIcon from "@/assets/icons/square-ts.svg";
import NextJsIcon from "@/assets/icons/next-js.svg";
import NpgsqlIcon from "@/assets/icons/postgresql.svg";
import TailwindIcon from "@/assets/icons/tailwind.svg";
import CSharpIcon from "@/assets/icons/csharp.svg";
import ReactIcon from "@/assets/icons/react.svg";
import DockerIcon from "@/assets/icons/docker.svg";
import { ToolboxItems } from "@/components/ToolboxItems";
import { DynamicMap } from "@/components/DynamicMap";

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
  left: string;
  top: string;
};

const hobbies: Hobby[] = [
  {
    title: "Reading",
    emoji: "📖",
    left: "5%",
    top: "5%",
  },
  {
    title: "Writing",
    emoji: "✍️",
    left: "40%",
    top: "5%",
  },
  {
    title: "Hiking",
    emoji: "🥾",
    left: "10%",
    top: "35%",
  },
  {
    title: "Cooking",
    emoji: "🍳",
    left: "35%",
    top: "40%",
  },
  {
    title: "Gaming",
    emoji: "🎮",
    left: "70%",
    top: "40%",
  },
  {
    title: "Traveling",
    emoji: "✈️",
    left: "5%",
    top: "65%",
  },
  {
    title: "Photography",
    emoji: "📷",
    left: "40%",
    top: "70%",
  },
  {
    title: "Learning",
    emoji: "🧠",
    left: "65%",
    top: "5%",
  },
  {
    title: "Music",
    emoji: "🎵",
    left: "65%",
    top: "70%",
  },
];

export const AboutSection = () => {
  return (
    <div id="about" className="py-20 md:px-24 lg:py-28">
      <div className="container">
        <SectionHeader
          title="A Glimpse into my world"
          description="Learn more about who I am, what I do, and what inspires me."
          eyebrow="About Me"
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my experiences."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={BookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
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
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                className="px-6 py-6"
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
              />
              <div className="relative flex-1">
                {hobbies.map((hobby) => {
                  return (
                    <div key={hobby.title}>
                      <div
                        style={{
                          left: hobby.left,
                          top: hobby.top,
                        }}
                        className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full py-1.5 absolute"
                      >
                        <span>{hobby.emoji}</span>
                        <span className="font-medium text-gray-950">
                          {hobby.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <DynamicMap
                center={[50.0782, 8.2398]}
                zoom={13}
                markerImage={SmileMemoji}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
