import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import ExtraleichtPage from "@/assets/images/extraleicht.png";
import SustaynPage from "@/assets/images/sustayn.png";
import PlegehilfePage from "@/assets/images/verbund-pflegehilfe.png";
import Football365ScoresPage from "@/assets/images/365-scores.png";
import { Card, OptimizedImage, SectionHeader } from "@/components/ui";
import { ScrollAnimationWrapper } from "@/wrappers";

const portfolioProjects = [
  {
    company: "Verbund Pflegehilfe",
    year: "2008",
    title: "Free Care Advice & Provider Matching Service",
    results: [
      { title: "Free personalized care consultation" },
      { title: "Matching with local care providers" },
      { title: "Support for obtaining care aids" },
      { title: "Guidance on subsidies & financing" },
      { title: "Advice on barrier-free home solutions" },
    ],
    link: "https://www.pflegehilfe.org",
    image: PlegehilfePage,
    // Actual image dimensions: 1629 x 1032, aspect ratio: ~1.58
    imageWidth: 1629,
    imageHeight: 1032,
  },
  {
    company: "Sustayn GmbH",
    year: "2021",
    title: "Employee Engagement Platform for Sustainability",
    results: [
      { title: "Gamified sustainability engagement" },
      { title: "Microlearning & knowledge sharing" },
      { title: "Challenges, events & rewards" },
      { title: "Idea management & co-determination" },
      { title: "Integration with intranet & apps" },
    ],
    link: "https://app.sustayn.de",
    image: SustaynPage,
    // Actual image dimensions: 800 x 507, aspect ratio: ~1.58
    imageWidth: 800,
    imageHeight: 507,
  },
  {
    company: "Extraleicht GmbH & Co. KG",
    year: "2012",
    title: "Extraleicht",
    results: [
      { title: "Heating oil price calculator" },
      { title: "Online heating oil ordering" },
      { title: "Tank service solutions" },
      { title: "Lubricants & operating supplies" },
      { title: "Customer service & contact" },
    ],
    link: "https://extraleicht.com",
    image: ExtraleichtPage,
    // Actual image dimensions: 800 x 507, aspect ratio: ~1.58
    imageWidth: 800,
    imageHeight: 507,
  },
  {
    company: "365Scores",
    year: "2012",
    title: "365Scores – Real-Time Sports Scores & Personalized Updates",
    results: [
      { title: "Live scores and real-time sports updates" },
      { title: "Personalized feeds for teams, leagues, and players" },
      { title: "Comprehensive coverage of multiple sports" },
      { title: "Sports betting insights and information" },
      { title: "Publisher tools for live score integration and monetization" },
    ],
    link: "https://www.365scores.com",
    image: Football365ScoresPage,
    // Actual image dimensions: 800 x 507, aspect ratio: ~1.58
    imageWidth: 1629,
    imageHeight: 1032,
  },
];

/**
 * ProjectsSection
 *
 * Sticky stacked showcase of selected projects emphasizing measurable results
 * and optimized visual previews.
 *
 * Behaviors:
 * - Incremental sticky offset (index-based) yields layered scroll illusion.
 * - Staggered reveal (ScrollAnimationWrapper) enhances perceived performance.
 * - Only the first image uses priority to conserve bandwidth.
 *
 * Performance:
 * - Static dataset colocated for simplicity / future extraction.
 * - OptimizedImage manages quality and optional blur placeholder.
 *
 * Accessibility:
 * - Semantic list structure for result bullets; external links secured with rel attributes.
 */
export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 md:px-24 lg:py-24">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            eyebrow="Real World Results"
            title="Featured Projects"
            description="Here are some of my recent projects that showcase my skills in creating high-quality, user-friendly web applications."
          />
        </ScrollAnimationWrapper>
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {portfolioProjects.map((project, projectIndex) => {
            return (
              <Card
                key={project.title}
                className="sticky px-8 pt-8 pb-0 md:px-10 md:pt-12 lg:px-20 lg:pt-16"
                style={{ top: `calc(64px + ${projectIndex * 40}px)` }}
              >
                <ScrollAnimationWrapper
                  animation="fadeInUp"
                  delay={projectIndex * 150}
                  threshold={0.2}
                  className="h-full"
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
                      <figure
                        className="relative rounded-2xl border border-white/10 bg-neutral-900/70 px-3 pt-6 pb-4 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] ring-1 ring-white/5 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50 lg:flex lg:h-full lg:flex-col"
                        aria-label={`${project.title} preview in MacBook frame`}
                      >
                        {/* Camera notch / bezel indicator */}
                        <div
                          className="pointer-events-none absolute top-1.5 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-black/40"
                          aria-hidden="true"
                        />
                        <div className="relative flex-grow overflow-hidden rounded-lg ring-1 ring-white/10">
                          <OptimizedImage
                            src={project.image}
                            alt={`${project.title} screenshot showcasing the ${project.company} project from ${project.year}`}
                            width={project.imageWidth}
                            height={project.imageHeight}
                            className="h-full w-full object-cover"
                            priority={projectIndex === 0}
                            quality={90}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </div>
                        {/* Bottom base / stand */}
                        <div
                          className="pointer-events-none mx-auto mt-3 h-1.5 w-32 rounded-full bg-gradient-to-r from-neutral-500/40 via-neutral-400/30 to-neutral-500/40"
                          aria-hidden="true"
                        />
                      </figure>
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
