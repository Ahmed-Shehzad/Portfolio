"use client";

import { Header, HeroSection } from "@/sections";
import dynamic from "next/dynamic";
import { FC } from "react";

// Prioritize above-the-fold sections with higher loading priority
const ProjectsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ProjectsSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: false, // Uses React Query - client-side only
  }
);

// Below-the-fold sections can load with lower priority
const TapeSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TapeSection })),
  {
    loading: () => <div className="h-32 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Keep SSR for SEO but with lower priority
  }
);

const TestimonialsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Keep SSR for SEO
  }
);

const AboutSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Keep SSR for SEO
  }
);

const ContactSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ContactSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Keep SSR for SEO
  }
);

const Footer = dynamic(() => import("@/sections").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 animate-pulse rounded-lg bg-gray-800/20" />,
  ssr: true, // Footer still benefits from SSR
});

const Home: FC = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
