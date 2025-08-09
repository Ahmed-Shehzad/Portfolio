import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { Card, OptimizedImage, SectionHeader } from "@/components/ui";
import { ScrollAnimationWrapper } from "@/wrappers";
import { Fragment, memo, useMemo } from "react";

// NOTE: Avatars manually reassigned to better align with perceived gender / persona of each testimonial.
// If the visual assets differ from these assumptions, adjust the mapping below without changing order of entries.
const testimonials = [
  {
    name: "Sarah Chen",
    position: "Product Manager",
    company: "CloudFlow Technologies",
    text: "Working with Ahmed was a game-changer for our SaaS product launch. He implemented a scalable architecture that reduced our deployment time by 40%, which meant we could ship features faster and respond to market changes instantly. His ability to explain complex technical concepts in simple terms also helped our non-technical team members align better with development goals.",
    avatar: memojiAvatar4,
    companyColor: "#3B82F6",
  },
  {
    name: "Marcus Rivera",
    position: "Chief Technology Officer",
    company: "BrightByte Solutions",
    text: "Ahmed's deep understanding of both frontend and backend systems allowed us to refactor a legacy codebase without any downtime — something I didn't think was possible. He introduced a clean architecture pattern that made onboarding new developers significantly easier. His code reviews are always constructive, and his documentation is top-notch.",
    avatar: memojiAvatar1,
    companyColor: "#10B981",
  },
  {
    name: "Dr. Emily Zhang",
    position: "Founder & CEO",
    company: "VisionX AI",
    text: "Ahmed doesn't just write code — he solves business problems. For our AI-driven platform, he built a microservices architecture on AWS that could handle a 3x traffic surge overnight without any hiccups. His proactive communication and dedication to deadlines made him feel like part of our core team.",
    avatar: memojiAvatar2,
    companyColor: "#8B5CF6",
  },
  {
    name: "Jordan Thompson",
    position: "Design Director",
    company: "PixelCraft Studio",
    text: "Ahmed is one of those rare developers who truly respects design. He translated our Figma prototypes into responsive, accessible, and high-performance UI components with pixel-perfect accuracy. Even better, he suggested subtle UX improvements that increased user engagement by 25%.",
    avatar: memojiAvatar5,
    companyColor: "#F59E0B",
  },
  {
    name: "Alex Rodriguez",
    position: "VP of Engineering",
    company: "NovaTech Global",
    text: "We were struggling with downtime and slow releases before Ahmed stepped in. Within two months, he set up an automated CI/CD pipeline, integrated containerization with Kubernetes, and improved our system reliability by 99.9%. His approach to problem-solving is both methodical and creative.",
    avatar: memojiAvatar3,
    companyColor: "#EF4444",
  },
];

/**
 * TestimonialsSection
 *
 * Seamless horizontal marquee of client testimonials using duplicated list
 * technique to avoid animation seams.
 *
 * Implementation:
 * - Data array rendered twice; second clone marked aria-hidden to suppress duplicate screen reader output.
 * - Star rating block memoized (useMemo) to avoid regenerating static SVG nodes.
 * - Hover pause via pure CSS (animation-play-state) – no JS listeners required.
 *
 * Performance:
 * - Memoized component; static testimonial data.
 * - Keys combine repeat index + author name for reconciliation stability.
 *
 * Accessibility:
 * - Descriptive avatar alt text; duplicated track excluded from accessibility tree.
 */
export const TestimonialsSection = memo(() => {
  // Memoize star rating JSX to prevent re-renders
  const starRating = useMemo(
    () => (
      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={`star-static-${String(i)}`}
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    ),
    []
  );
  return (
    <section id="testimonials" className="py-16 md:px-24 lg:py-24">
      <div className="container">
        <ScrollAnimationWrapper animation="fadeInUp">
          <SectionHeader
            eyebrow="Happy Clients"
            title="What Clients have to say about my work."
            description="Don't just take my word for it. See what my clients have to say about my work."
          />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper animation="fadeIn" delay={300}>
          <div className="-my-4 mt-12 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 lg:mt-24">
            <div className="flex flex-none animate-[move-left_45s_linear_infinite] gap-8 pr-8 will-change-transform hover:[animation-play-state:paused]">
              {[0, 1].map((repeatIndex) => (
                <Fragment
                  key={`card-fragment-repeat-${repeatIndex}-${testimonials
                    .map((t) => t.name)
                    .join("-")}`}
                >
                  {testimonials.map((testimonial) => {
                    return (
                      <Card
                        key={`${testimonial.name}-${repeatIndex}`}
                        className="max-w-xs p-6 transition duration-300 hover:-rotate-3 md:max-w-md md:p-8"
                        aria-hidden={repeatIndex === 1}
                      >
                        {/* Header with Avatar and Company Badge */}
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
                              <OptimizedImage
                                src={testimonial.avatar}
                                alt={`${testimonial.name}'s avatar`}
                                width={48}
                                height={48}
                                className="max-h-full rounded-full"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-white">{testimonial.name}</div>
                              <div className="text-xs text-white/60">{testimonial.position}</div>
                            </div>
                          </div>
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                            style={{ backgroundColor: testimonial.companyColor }}
                          >
                            {testimonial.company.charAt(0)}
                          </div>
                        </div>

                        {/* Company Name */}
                        <div className="mb-4">
                          <span className="text-sm font-medium text-white/80">
                            {testimonial.company}
                          </span>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-sm leading-relaxed text-white/90 md:text-base">
                          {testimonial.text}
                        </p>

                        {/* Rating Stars */}
                        {starRating}
                      </Card>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";
