"use client";

import { motion } from "motion/react";
import { FC } from "react";

type SectionHeaderProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export const SectionHeader: FC<SectionHeaderProps> = (props) => {
  const { title, eyebrow, description } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-center">
        <p className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-center font-semibold tracking-widest text-transparent uppercase">
          {eyebrow}
        </p>
      </div>
      <div className="container px-10">
        <h2 className="text-ink mt-6 text-center font-serif text-3xl md:text-5xl">{title}</h2>
        <p className="text-ink-soft mx-auto mt-4 max-w-md text-center md:text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
