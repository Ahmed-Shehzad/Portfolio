"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Import components that don't use browser APIs directly
const HeaderSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeaderSection })),
  {
    ssr: false,
    loading: () => <div className="h-16 animate-pulse bg-gray-800" />,
  }
);

const HeroSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeroSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-96 animate-pulse bg-gray-800" />,
  }
);

const FooterSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.FooterSection })),
  {
    ssr: false,
    loading: () => <div className="h-32 animate-pulse bg-gray-800" />,
  }
);

// Dynamic import components that use browser APIs
const ProjectsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ProjectsSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-64 animate-pulse bg-gray-800" />,
  }
);

const TapeSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TapeSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-48 animate-pulse bg-gray-800" />,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-64 animate-pulse bg-gray-800" />,
  }
);

const AboutSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.AboutSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-64 animate-pulse bg-gray-800" />,
  }
);

const ContactSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ContactSection })),
  {
    ssr: false,
    loading: () => <div className="mx-4 h-64 animate-pulse bg-gray-800" />,
  }
);

// Wrapper component that uses scroll animations
const ScrollWrapper = dynamic(
  () => import("@/wrappers").then((mod) => ({ default: mod.ScrollAnimationWrapper })),
  {
    ssr: false,
  }
);

function LoadingSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-900 text-white">
      <div className="mb-4 h-16 bg-gray-800" />
      <div className="mx-4 mb-4 h-96 bg-gray-800" />
      <div className="mx-4 mb-4 h-64 bg-gray-800" />
      <div className="mx-4 mb-4 h-48 bg-gray-800" />
    </div>
  );
}

export default function Home() {
  return (
    <ScrollWrapper>
      <Suspense fallback={<LoadingSkeleton />}>
        <HeaderSection />
        <HeroSection />
        <ProjectsSection />
        <TapeSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </Suspense>
    </ScrollWrapper>
  );
}
