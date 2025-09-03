"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

// Header uses scroll listeners and window - disable SSR
const HeaderSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeaderSection })),
  {
    ssr: false,
  }
);

// Hero uses document.getElementById - disable SSR
const HeroSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeroSection })),
  {
    ssr: false,
  }
);

// Enable SSR for sections that don't use browser APIs
const ProjectsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ProjectsSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Enable SSR for better initial load
  }
);

const TapeSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TapeSection })),
  {
    loading: () => <div className="h-32 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Enable SSR for better initial load
  }
);

const TestimonialsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Enable SSR for better initial load
  }
);

const AboutSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.AboutSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Enable SSR for better initial load
  }
);

const ContactSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ContactSection })),
  {
    loading: () => <div className="h-96 animate-pulse rounded-lg bg-gray-800/20" />,
    ssr: true, // Enable SSR for better initial load
  }
);

const Footer = dynamic(() => import("@/sections").then((mod) => ({ default: mod.FooterSection })), {
  loading: () => <div className="h-32 animate-pulse rounded-lg bg-gray-800/20" />,
  ssr: true, // Enable SSR for better initial load
});

const Home: FC = () => {
  return (
    <>
      <HeaderSection />
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
