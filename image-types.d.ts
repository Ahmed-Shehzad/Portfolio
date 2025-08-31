// Comprehensive image type declarations for all environments
// This file ensures image imports work in local, CI, and build environments

/// <reference types="next" />
/// <reference types="next/image-types/global" />

import type { StaticImageData } from "next/image";

// ===========================================
// EXPLICIT DECLARATIONS FOR ALL IMAGE FILES
// ===========================================

// Me image
declare module "@/assets/images/me.jpg" {
  const content: StaticImageData;
  export default content;
}

// Grain texture
declare module "@/assets/images/grain.jpg" {
  const content: StaticImageData;
  export default content;
}

// Memoji and avatar images
declare module "@/assets/images/memoji-smile.png" {
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

// Book and business images
declare module "@/assets/images/book-cover.png" {
  const content: StaticImageData;
  export default content;
}

// Company logos and portfolio images
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

// ===========================================
// ALTERNATIVE PATH PATTERNS (NO ALIAS)
// ===========================================

declare module "src/assets/images/me.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/grain.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-smile.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/book-cover.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/extraleicht.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/sustayn.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/verbund-pflegehilfe.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/365-scores.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-avatar-1.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-avatar-2.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-avatar-3.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-avatar-4.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/memoji-avatar-5.png" {
  const content: StaticImageData;
  export default content;
}

// ===========================================
// WILDCARD PATTERNS
// ===========================================

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

// Alternative wildcard patterns
declare module "src/assets/images/*.png" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/*.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/*.jpeg" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/*.webp" {
  const content: StaticImageData;
  export default content;
}

declare module "src/assets/images/*.avif" {
  const content: StaticImageData;
  export default content;
}

// Generic patterns for any path
declare module "*.png" {
  const content: StaticImageData;
  export default content;
}

declare module "*.jpg" {
  const content: StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  const content: StaticImageData;
  export default content;
}

declare module "*.webp" {
  const content: StaticImageData;
  export default content;
}

declare module "*.avif" {
  const content: StaticImageData;
  export default content;
}

// ===========================================
// PDF DECLARATIONS
// ===========================================

declare module "@/assets/documents/*.pdf" {
  const content: string;
  export default content;
}

declare module "*.pdf" {
  const content: string;
  export default content;
}
