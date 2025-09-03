import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { Card, OptimizedImage, SectionHeader } from "@/components/ui";
import { ScrollAnimationWrapper } from "@/wrappers";
import { useTranslations } from "next-intl";
import { Fragment, memo, useMemo } from "react";

// NOTE: Avatars manually reassigned to better align with perceived gender / persona of each testimonial.
// If the visual assets differ from these assumptions, adjust the mapping below without changing order of entries.

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
  const t = useTranslations("testimonials");

  // Create an array of testimonials by accessing numbered keys
  const testimonials: Array<{
    name: string;
    position: string;
    company: string;
    text: string;
    avatar: string;
  }> = [];

  // Create an array of testimonials by accessing numbered keys
  for (let i = 0; i < 5; i++) {
    // We know we have exactly 5 testimonials (0-4)
    try {
      const nameKey = `items.${i}.name`;
      const name = t(nameKey);
      // Check if the translation was found (not the key itself)
      if (name && !name.includes("testimonials.items.")) {
        testimonials.push({
          name,
          position: t(`items.${i}.position`),
          company: t(`items.${i}.company`),
          text: t(`items.${i}.text`),
          avatar: t(`items.${i}.avatar`),
        });
      } else {
        break; // Stop when no more translations found
      }
    } catch {
      // Stop when translation key doesn't exist
      break;
    }
  }

  // If no testimonials were loaded, use fallback
  if (testimonials.length === 0) {
    testimonials.push({
      name: "Alex Thompson",
      position: "Senior Product Manager",
      company: "TechFlow Solutions",
      text: "Working with Ahmed was a game-changer for our SaaS product launch. His technical expertise and attention to detail helped us deliver a robust, scalable solution that exceeded our expectations.",
      avatar: "memojiAvatar1",
    });
  }

  // Map avatar strings to actual imported images
  const avatarMap = {
    memojiAvatar1,
    memojiAvatar2,
    memojiAvatar3,
    memojiAvatar4,
    memojiAvatar5,
  };

  // Convert testimonials to include actual avatar images and colors
  const processedTestimonials = testimonials.map((testimonial, index) => ({
    ...testimonial,
    avatar: avatarMap[testimonial.avatar as keyof typeof avatarMap] || memojiAvatar1,
    companyColor: [
      "#14B8A6", // emerald-500
      "#F43F5E", // rose-500
      "#EF4444", // red-500
      "#06B6D4", // cyan-500
    ][index % 4],
  }));
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
              {[0, 1].map((repeat) => (
                <Fragment key={repeat}>
                  {processedTestimonials.map((testimonial) => (
                    <Card
                      key={`${testimonial.name}-${repeat}`}
                      className="max-w-xs p-6 transition duration-300 hover:-rotate-3 md:max-w-md md:p-8"
                      aria-hidden={repeat === 1}
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
                  ))}
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
