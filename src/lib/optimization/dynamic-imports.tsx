"use client";
/**
 * Phase 3: Bundle Size Optimization - Dynamic Imports
 *
 * This module implements strategic dynamic imports to reduce initial bundle size
 * by lazy loading components only when they're needed.
 */

import dynamic from "next/dynamic"; /**
 * Dynamic Loading for Contact Modal
 * Only loads when user initiates contact action
 */
export const DynamicContactModal = dynamic(
  () =>
    import("@/features/contact/components/ContactModal").then((mod) => ({
      default: mod.ContactModal,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
          <p className="text-sm text-white/60">Loading contact form...</p>
        </div>
      </div>
    ),
    ssr: false, // Contact modal is user interaction dependent
  }
);

/**
 * Dynamic Loading for Resume Components
 * Only loads when user navigates to resume page
 */
export const DynamicResumeContent = dynamic(
  () =>
    import("@/app/[locale]/resume/components/ResumeMainContent").then((mod) => ({
      default: mod.ResumeMainContent,
    })),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-gray-700" />
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-gray-800" />
          <div className="h-4 w-5/6 rounded bg-gray-800" />
          <div className="h-4 w-4/6 rounded bg-gray-800" />
        </div>
      </div>
    ),
    ssr: true,
  }
);

export const DynamicResumeSidebar = dynamic(
  () =>
    import("@/app/[locale]/resume/components/ResumeSidebar").then((mod) => ({
      default: mod.ResumeSidebar,
    })),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-32 rounded bg-gray-700" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-800" />
          <div className="h-3 w-3/4 rounded bg-gray-800" />
        </div>
      </div>
    ),
    ssr: true,
  }
);

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

export const DynamicDownloadButton = dynamic(
  () =>
    import("@/app/[locale]/resume/components/DownloadButton").then((mod) => ({
      default: mod.DownloadButton,
    })),
  {
    loading: () => <div className="h-12 w-32 animate-pulse rounded-md bg-emerald-600/20" />,
    ssr: false, // PDF generation is client-side only
  }
);

/**
 * Bundle Splitting Utilities
 */
export const bundleSplittingConfig = {
  // Components that should be eagerly loaded
  critical: ["Header", "Hero", "Projects"],
  // Components that can be lazy loaded
  deferred: ["ContactModal", "OpenStreetMap", "ResumeContent", "DownloadButton"],
  // Components that should only load on interaction
  onDemand: ["ContactModal", "DownloadButton"],
};

const dynamicImports = {
  DynamicContactModal,
  DynamicResumeContent,
  DynamicResumeSidebar,
  DynamicOpenStreetMap,
  DynamicDownloadButton,
  bundleSplittingConfig,
};

export default dynamicImports;
