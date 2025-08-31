// Consolidated image module declarations (fallback) to help CI resolution.
import type { StaticImageData } from "next/image";

// Generic image module declarations
declare module "*.png" {
  const v: StaticImageData;
  export default v;
}
declare module "*.jpg" {
  const v: StaticImageData;
  export default v;
}
declare module "*.jpeg" {
  const v: StaticImageData;
  export default v;
}
declare module "*.webp" {
  const v: StaticImageData;
  export default v;
}
declare module "*.avif" {
  const v: StaticImageData;
  export default v;
}

// Path alias wildcards
declare module "@/assets/images/*.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/*.jpg" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/*.jpeg" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/*.webp" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/*.avif" {
  const v: StaticImageData;
  export default v;
}

// Explicit declarations for problematic files (CI compatibility)
declare module "@/assets/images/me.jpg" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/grain.jpg" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-smile.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/book-cover.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/extraleicht.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/sustayn.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/verbund-pflegehilfe.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/365-scores.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-avatar-1.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-avatar-2.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-avatar-3.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-avatar-4.png" {
  const v: StaticImageData;
  export default v;
}
declare module "@/assets/images/memoji-avatar-5.png" {
  const v: StaticImageData;
  export default v;
}

// PDF file declarations
declare module "*.pdf" {
  const v: string;
  export default v;
}

declare module "@/assets/documents/*.pdf" {
  const v: string;
  export default v;
}
