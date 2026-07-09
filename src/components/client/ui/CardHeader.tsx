"use client";

import StarIcon from "@/assets/icons/star.svg";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type CardHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export const CardHeader: FC<CardHeaderProps> = (props) => {
  const { title, description, className } = props;
  return (
    <div className={twMerge("flex flex-col p-6 md:px-10 md:py-8", className)}>
      <div className="inline-flex items-center gap-2">
        <StarIcon className="size-9 text-violet-500" />
        <h3 className="text-ink font-serif text-3xl">{title}</h3>
      </div>
      <p className="text-ink-soft mt-2 text-sm lg:text-base">{description}</p>
    </div>
  );
};
