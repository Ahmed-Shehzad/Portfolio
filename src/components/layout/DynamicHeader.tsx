/**
 * Dynamic Header Component
 *
 * Lazy loads the Header component to reduce initial bundle size.
 * The Header contains navigation logic that's not immediately critical.
 */

import dynamic from "next/dynamic";
import { ComponentProps, FC } from "react";

// Dynamic import with loading fallback
const HeaderComponent = dynamic(
  () => import("@/sections/Header").then((mod) => ({ default: mod.Header })),
  {
    loading: () => (
      <header className="fixed top-3 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 transform px-3">
        <div className="h-14 animate-pulse rounded-full bg-white/10 p-4 backdrop-blur" />
      </header>
    ),
    ssr: false, // Header uses scroll listeners and window APIs
  }
);

type HeaderProps = ComponentProps<typeof HeaderComponent>;

/**
 * Wrapper component that provides the same interface as the original Header
 * but loads it dynamically to improve initial bundle size
 */
export const DynamicHeader: FC<HeaderProps> = (props) => {
  return <HeaderComponent {...props} />;
};

export default DynamicHeader;
