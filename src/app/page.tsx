"use client";

import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// All sections need to be client-side due to animations and browser APIs
const HeaderSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeaderSection })),
  {
    ssr: false,
    loading: () => <div className="h-16 bg-gray-900/50" />,
  }
);

const HeroSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeroSection })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const ProjectsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ProjectsSection })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const TapeSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TapeSection })),
  {
    ssr: false,
    loading: () => <div className="h-32 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const AboutSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.AboutSection })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const ContactSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ContactSection })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
  }
);

const FooterSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.FooterSection })),
  {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-900/50" />,
  }
);

// Client-side only portfolio for optimal performance
const Home: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state during SSR
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gray-900">
        <div className="h-16 bg-gray-900/50" />
        <div className="mx-4 my-8 h-96 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="mx-4 my-8 h-96 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="mx-4 my-8 h-32 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="mx-4 my-8 h-96 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="mx-4 my-8 h-96 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="mx-4 my-8 h-96 animate-pulse rounded-lg bg-gray-800/20" />
        <div className="h-32 bg-gray-900/50" />
      </main>
    );
  }

  return (
    <>
      <HeaderSection />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default Home;
