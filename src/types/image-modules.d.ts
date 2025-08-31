// Image asset type declarations for path aliases and static imports
// This file ensures TypeScript can resolve image imports in both local and CI environments
import type { StaticImageData } from "next/image";

// Specific image files used in the application - explicit declarations for better CI compatibility
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

// Wildcard patterns for comprehensive coverage (fallback)
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

// Alternative declarations without path alias for CI compatibility
declare module "*/assets/images/me.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/grain.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-smile.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/book-cover.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/extraleicht.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/sustayn.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/verbund-pflegehilfe.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/365-scores.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-avatar-1.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-avatar-2.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-avatar-3.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-avatar-4.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*/assets/images/memoji-avatar-5.png" {
  const content: StaticImageData;
  export default content;
}

// PDF file declarations for documents
declare module "@/assets/documents/*.pdf" {
  const content: string;
  export default content;
}
