import CSharpIcon from "@/assets/icons/csharp.svg";
import DockerIcon from "@/assets/icons/docker.svg";
import DotnetIcon from "@/assets/icons/dotnet.svg";
import NextJsIcon from "@/assets/icons/next-js.svg";
import NpgsqlIcon from "@/assets/icons/postgresql.svg";
import ReactIcon from "@/assets/icons/react.svg";
import TypeScriptIcon from "@/assets/icons/square-ts.svg";
import TailwindIcon from "@/assets/icons/tailwind.svg";

import type { ToolboxItem } from "../types";

// Toolbox/Technology items
export const TOOLBOX_ITEMS: ToolboxItem[] = [
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
