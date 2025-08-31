// Explicit declarations for asset imports via path alias '@/assets/...'
// Some CI environments with moduleResolution "bundler" can be stricter; these
// patterns make the alias + extension combination unambiguous to the compiler.
import type { StaticImageData } from "next/image";

// Explicit image file declarations
declare module "@/assets/images/me.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/grain.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-smile.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/book-cover.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/extraleicht.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/sustayn.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/verbund-pflegehilfe.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/365-scores.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-avatar-1.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-avatar-2.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-avatar-3.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-avatar-4.png" {
  const content: StaticImageData;
  export default content;
}

declare module "@/assets/images/memoji-avatar-5.png" {
  const content: StaticImageData;
  export default content;
}

// General wildcard patterns as fallback
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

// PDF file declarations for documents
declare module "@/assets/documents/*.pdf" {
  const content: string;
  export default content;
}
