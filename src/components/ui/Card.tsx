"use client";

import GrainImage from "@/assets/images/grain.jpg";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

export const Card: FC<ComponentPropsWithoutRef<"div">> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <div
      className={twMerge(
        "relative z-0 overflow-hidden rounded-3xl border border-white/30 bg-gray-800 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:outline after:outline-offset-2 after:outline-white/20 after:content-['']",
        className
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${GrainImage.src})`,
        }}
      ></div>
      {children}
    </div>
  );
};
