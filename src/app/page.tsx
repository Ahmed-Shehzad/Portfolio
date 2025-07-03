import { AboutSection } from "@/sections/About";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

export default function Home() {
  return (
    <div>
      <div className="md:p-8  items-centerjustify-center">
        <Header />
        <HeroSection />
        <ProjectsSection />
      </div>
      <TapeSection />
      <div className="md:p-8 items-center justify-center">
        <TestimonialsSection />
        <AboutSection />
      </div>
    </div>
  );
}
