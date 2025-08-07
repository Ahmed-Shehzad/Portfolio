"use client";

import ArrowDown from "@/assets/icons/arrow-down.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import StarIcon from "@/assets/icons/star.svg";
import GrainImage from "@/assets/images/grain.jpg";
import PortraitImage from "@/assets/images/me.jpg";
import MemojiImage from "@/assets/images/memoji-computer.png";
import { HeroOrbit } from "@/components/HeroOrbit";
import Image from "next/image";

export const HeroSection = () => {
  const handleConnectClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative z-0 container overflow-x-clip py-32 md:px-24 md:py-48 lg:py-60"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${GrainImage.src})`,
          }}
        ></div>
        <div className="hero-ring size-[620px]"></div>
        <div className="hero-ring size-[820px]"></div>
        <div className="hero-ring size-[1020px]"></div>
        <div className="hero-ring size-[1220px]"></div>
        <div className="hero-ring size-[1480px]"></div>

        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-41}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-2 rounded-full text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-28 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={720}
          rotation={85}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-3 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-3 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="50s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-[28px] text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="relative z-10 container">
        <div className="flex flex-col items-center">
          <Image src={MemojiImage} alt="memoji" className="size-[100px]" />
          <div className="inline-flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 px-4 py-1.5">
            <div className="relative size-2.5 rounded-full bg-green-500">
              <div className="animation-ping absolute inset-0 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-medium">Available for new projects</div>
          </div>
        </div>
        <div className="mx-auto max-w-lg p-8 md:max-w-2xl lg:max-w-5xl">
          <div className="container rounded-4xl border border-neutral-400/20 bg-neutral-400/20 p-8 pt-2 text-neutral-300 backdrop-blur-[1px] transition-all duration-300 hover:bg-neutral-400/30 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 translate-y-2 transform rounded-full bg-gradient-to-b from-transparent to-black/50 blur-lg"></div>
                <Image
                  src={PortraitImage}
                  alt="Portrait"
                  className="relative z-10 rounded-full border-4 border-transparent"
                  width={150}
                  height={150}
                />
              </div>
              <div className="text-center md:text-right">
                <h1 className="font-serif text-3xl tracking-wide md:text-5xl">
                  Muhammad Ahmed Shehzad
                </h1>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I am a Full Stack Developer with a passion for building web applications and services.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button
            onClick={handleExploreClick}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-6"
          >
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </button>
          <button
            onClick={handleConnectClick}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-white bg-white px-6 text-gray-900"
          >
            <span>👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </section>
  );
};
