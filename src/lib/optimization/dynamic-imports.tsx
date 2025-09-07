/**
 * Dynamic Component Imports
 *
 * Implements bundle splitting and lazy loading for performance optimization.
 * These components are loaded only when needed, reducing initial bundle size.
 */

"use client";

import dynamic from "next/dynamic";

/**
 * Dynamic Loading for Heavy Feature Components
 */
export const DynamicOpenStreetMap = dynamic(
  () =>
    import("@/features/about/components/OpenStreetMap").then((mod) => ({
      default: mod.OpenStreetMap,
    })),
  {
    loading: () => <div className="h-80 animate-pulse rounded-lg bg-gray-700" />,
    ssr: false, // Maps require client-side APIs
  }
);

/**
 * Contact Modal - loaded when user interacts with contact elements
 */
export const DynamicContactModal = dynamic(
  () =>
    import("@/features/contact/components/ContactModal").then((mod) => ({
      default: mod.ContactModal,
    })),
  {
    loading: () => (
      <div className="animate-pulse">
        <div className="h-96 w-full rounded-lg bg-gray-700" />
      </div>
    ),
    ssr: false, // Modal requires client-side interaction
  }
);

/**
 * Bundle Splitting Utilities
 */
export const bundleSplittingConfig = {
  // Components that should be eagerly loaded
  critical: ["Header", "Hero", "Projects"],
  // Components that can be lazy loaded
  deferred: ["ContactModal", "OpenStreetMap"],
  // Components that should only load on interaction
  onDemand: ["ContactModal"],
};

const dynamicImports = {
  DynamicContactModal,
  DynamicOpenStreetMap,
  bundleSplittingConfig,
};

export default dynamicImports;
