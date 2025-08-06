import React, { ComponentPropsWithoutRef, FC } from "react";
import GrainImage from "@/assets/images/grain.jpg";
import { twMerge } from "tailwind-merge";

export const Card: FC<ComponentPropsWithoutRef<"div">> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <div
      className={twMerge(
        "bg-gray-800 border border-white/30 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline after:outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none",
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
