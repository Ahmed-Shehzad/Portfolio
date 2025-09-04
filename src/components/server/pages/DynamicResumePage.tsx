/**
 * Dynamic Resume Page Component
 *
 * Lazy loads the entire resume page to reduce initial bundle size.
 * This is beneficial since resume viewing is a separate user flow.
 */

import dynamic from "next/dynamic";
import { ComponentProps, FC } from "react";

// Dynamic import with comprehensive loading fallback
const ResumePageComponent = dynamic(() => import("@/app/[locale]/resume/page"), {
  loading: () => (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Skeleton for header */}
        <div className="mb-8 animate-pulse">
          <div className="mb-4 h-8 w-64 rounded bg-gray-700" />
          <div className="h-4 w-96 rounded bg-gray-700" />
        </div>

        {/* Skeleton for content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {Array.from({ length: 4 }, (_, i) => `content-skeleton-${i}`).map((key) => (
              <div key={key} className="animate-pulse">
                <div className="mb-3 h-6 w-32 rounded bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-800" />
                  <div className="h-4 w-5/6 rounded bg-gray-800" />
                  <div className="h-4 w-4/6 rounded bg-gray-800" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {Array.from({ length: 3 }, (_, i) => `sidebar-skeleton-${i}`).map((key) => (
              <div key={key} className="animate-pulse">
                <div className="mb-3 h-5 w-24 rounded bg-gray-700" />
                <div className="space-y-1">
                  <div className="h-3 w-full rounded bg-gray-800" />
                  <div className="h-3 w-3/4 rounded bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true, // Resume page can benefit from SSR for SEO
});

type ResumePageProps = ComponentProps<typeof ResumePageComponent>;

/**
 * Wrapper component that provides the same interface as the original Resume page
 * but loads it dynamically to improve initial bundle size
 */
export const DynamicResumePage: FC<ResumePageProps> = (props) => {
  return <ResumePageComponent {...props} />;
};

export default DynamicResumePage;
