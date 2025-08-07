import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";

const portfolioProjects = [
  {
    company: "Acme Corp",
    year: "2022",
    title: "Dark Saas Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/4k7IdSLxh6w",
    image: darkSaasLandingPage,
  },
  {
    company: "Innovative Co",
    year: "2021",
    title: "Light Saas Landing Page",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://youtu.be/7hi5zwO75yc",
    image: lightSaasLandingPage,
  },
  {
    company: "Quantum Dynamics",
    year: "2023",
    title: "AI Startup Landing Page",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://youtu.be/Z7I5uSRHMHg",
    image: aiStartupLandingPage,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 md:px-24 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real World Results"
          title="Featured Projects"
          description="Here are some of my recent projects that showcase my skills in
          creating high-quality, user-friendly web applications."
        />
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {portfolioProjects.map((project, projectIndex) => {
            return (
              <Card
                key={project.title}
                className="sticky px-8 pt-8 pb-0 md:px-10 md:pt-12 lg:px-20 lg:pt-16"
                style={{ top: `calc(64px + ${projectIndex * 40}px` }}
              >
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                  <div className="lg:pb-16">
                    <div className="inline-flex bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase">
                      <span>{project.company}</span>
                      <span>&bull;</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-2xl md:mt-5 md:text-4xl">
                      {project.title}
                    </h3>
                    <hr className="mt-4 border-t-2 border-white/5 md:mt-5" />
                    <ul className="mt-4 flex flex-col gap-4 md:mt-5">
                      {project.results.map((result) => (
                        <li
                          key={result.title}
                          className="flex gap-2 text-sm text-white/50 md:text-base"
                        >
                          <CheckCircleIcon className="size-5 md:size-6" />
                          <span>{result.title}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      <button className="mt-8 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-neutral-400/20 bg-neutral-400/20 px-6 font-semibold backdrop-blur-[1px] transition-all duration-300 text-shadow-white hover:bg-neutral-400/30 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)] md:w-auto">
                        <span>View Project</span>
                        <ArrowUpRightIcon className="size-4" />
                      </button>
                    </a>
                  </div>
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="mt-8 -mb-4 md:-mb-0 lg:absolute lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
