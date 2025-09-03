// Icon-specific declarations for SVG icons with better IDE support
import type { FC, SVGProps } from "react";

declare module "@/assets/icons/*.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

// Specific icon declarations for better IDE support
declare module "@/assets/icons/arrow-up-right.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/github.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/chrome.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/css3.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/html5.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/javascript.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/react.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/typescript.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "@/assets/icons/nodejs.svg" {
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
