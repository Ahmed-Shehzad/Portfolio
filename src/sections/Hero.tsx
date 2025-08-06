import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import StarIcon from "@/assets/icons/star.svg";
import GrainImage from "@/assets/images/grain.jpg";
import MemojiImage from "@/assets/images/memoji-computer.png";
import { HeroOrbit } from "@/components/HeroOrbit";
import SparkleIcon from "@/assets/icons/sparkle.svg";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="container py-32 md:py-48 md:px-24 lg:py-60 relative z-0 overflow-x-clip"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${GrainImage.src})`,
          }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <div className="size-[1480px] hero-ring"></div>

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
      <div className="container">
        <div className="flex flex-col items-center">
          <Image src={MemojiImage} alt="memoji" className="size-[100px]" />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animation-ping"></div>
            </div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="p-8 max-w-lg mx-auto">
          <div className="container rounded-4xl p-8 pt-2 bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-300 backdrop-blur-[1px] border border-neutral-400/20 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)] transition-all duration-300">
            <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide">
              Muhammad Ahmed Shehzad
            </h1>
          </div>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I am a Full Stack Developer with a passion for building web
            applications and services.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </button>
          <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
            <span>👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </section>
  );
};
