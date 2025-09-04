"use client";

import { FC } from "react";

type SectionHeaderProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export const SectionHeader: FC<SectionHeaderProps> = (props) => {
  const { title, eyebrow, description } = props;
  return (
    <>
      <div className="flex justify-center">
        <p className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-center font-semibold tracking-widest text-transparent uppercase">
          {eyebrow}
        </p>
      </div>
      <div className="container px-10">
        <h2 className="mt-6 text-center font-serif text-3xl md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-center text-white/60 md:text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </>
  );
};
