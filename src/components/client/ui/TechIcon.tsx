"use client";

import { FC } from "react";

type TechIconProps = {
  component: React.ElementType;
  alt?: string;
};

export const TechIcon: FC<TechIconProps> = (props) => {
  const { component, alt } = props;
  const Icon = component;
  return (
    <>
      <Icon className="size-10 fill-[url(#tech-icon-gradient)]" alt={alt} />
      <svg className="absolute size-0">
        <linearGradient id="tech-icon-gradient">
          <stop offset="0%" stopColor="rgb(110 231 183)" />
          <stop offset="100%" stopColor="rgb(56 189 248)" />
        </linearGradient>
      </svg>
    </>
  );
};
