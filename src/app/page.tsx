import {
  AboutSection,
  ContactSection,
  Footer,
  Header,
  HeroSection,
  ProjectsSection,
  TapeSection,
  TestimonialsSection,
} from "@/sections";
import { FC } from "react";

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
