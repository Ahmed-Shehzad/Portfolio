import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { Card } from "@/components/Card";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Alex Turner",
    position: "Marketing Manager @ TechStartups",
    text: "Ahmed's full-stack expertise with React, TypeScript, and .NET transformed our entire platform. His ability to seamlessly integrate frontend and backend systems while maintaining clean architecture principles is exceptional. We're thrilled with the scalable solution!",
    avatar: memojiAvatar1,
  },
  {
    name: "Olivia Green",
    position: "Head of Design @ GreenLeaf",
    text: "Working with Ahmed was incredible. His mastery of React, Redux, and Tailwind CSS brought our designs to life perfectly, while his backend skills with C# and PostgreSQL ensured everything ran smoothly. The full-stack approach exceeded our expectations.",
    avatar: memojiAvatar2,
  },
  {
    name: "Daniel White",
    position: "CEO @ InnovateCo",
    text: "Ahmed's expertise in microservices architecture, Docker, and AWS helped us build a robust, scalable platform. His knowledge of CQRS, Domain Driven Design, and Test Driven Development resulted in a maintainable codebase that our team loves working with.",
    avatar: memojiAvatar3,
  },
  {
    name: "Emily Carter",
    position: "Product Manager @ GlobalTech",
    text: "Ahmed is a true full-stack wizard. His proficiency with Next.js, GraphQL, and Apollo on the frontend, combined with his .NET, MediatR, and Redis expertise on the backend, delivered an intuitive and high-performing application. Our customers are thrilled!",
    avatar: memojiAvatar4,
  },
  {
    name: "Michael Brown",
    position: "Director of IT @ MegaCorp",
    text: "Ahmed's comprehensive skills spanning React, TypeScript, C#, Kubernetes, and CI/CD pipelines made our digital transformation seamless. His Agile approach and clean architecture methodology delivered exceptional results. We highly recommend his full-stack expertise.",
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 md:px-24 lg:py-24">
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
            <div className="flex flex-none animate-[move-left_30s_linear_infinite] gap-8 pr-8 hover:[animation-play-state:paused]">
              {[...new Array(2)].fill(0).map((_, repeatIndex) => (
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
                      >
                        <div className="flex items-center gap-4">
                          <div className="inline-flex size-14 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
                            <Image
                              src={testimonial.avatar}
                              alt={`${testimonial.name}'s avatar`}
                              className="max-h-full"
                            />
                          </div>
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-white/40">{testimonial.position}</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm md:mt-6 md:text-base">{testimonial.text}</p>
                      </Card>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};
