"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

// Dynamically import all sections with SSR disabled to prevent window access issues
const HeaderSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeaderSection })),
  { ssr: false }
);

const HeroSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.HeroSection })),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ProjectsSection })),
  { ssr: false }
);

const TapeSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TapeSection })),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.TestimonialsSection })),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.AboutSection })),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.ContactSection })),
  { ssr: false }
);

const FooterSection = dynamic(
  () => import("@/sections").then((mod) => ({ default: mod.FooterSection })),
  { ssr: false }
);

// Client-side rendered portfolio to prevent SSR issues
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
      <FooterSection />
    </>
  );
};

export default Home;
