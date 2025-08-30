// Explicit declarations for asset imports via path alias '@/assets/...'
// Some CI environments with moduleResolution "bundler" can be stricter; these
// patterns make the alias + extension combination unambiguous to the compiler.
import type { StaticImageData } from "next/image";

declare module "@/assets/images/*.{png,jpg,jpeg,webp,avif}" {
  const content: StaticImageData;
  export default content;
}

// PDF file declarations for documents
declare module "@/assets/documents/*.pdf" {
  const content: string;
  export default content;
}
