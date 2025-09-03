// Path alias wildcard declarations for better TypeScript path resolution
import type { StaticImageData } from "next/image";

declare module "@/assets/images/*.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/*.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/*.jpeg" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/*.webp" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/*.avif" {
  const content: StaticImageData;
  export default content;
}
