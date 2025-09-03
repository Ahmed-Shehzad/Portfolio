// SVG module declarations for React components and URL imports
import type { FC, SVGProps } from "react";

declare module "*.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
