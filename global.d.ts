// Consolidated image module declarations (fallback) to help CI resolution.
import type { StaticImageData } from "next/image";

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
