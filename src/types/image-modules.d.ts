// Explicit declarations for asset imports via path alias '@/assets/...'
// Some CI environments with moduleResolution "bundler" can be stricter; these
// patterns make the alias + extension combination unambiguous to the compiler.
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
