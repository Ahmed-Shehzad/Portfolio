"use client";

import GrainImage from "@/assets/images/grain.jpg";
import { ComponentPropsWithoutRef, memo } from "react";
import { twMerge } from "tailwind-merge";

const CardComponent = (props: ComponentPropsWithoutRef<"div">) => {
  const { className, children, ...otherProps } = props;
  return (
    <div
      className={twMerge("glass-panel relative z-0 overflow-hidden rounded-3xl", className)}
      {...otherProps}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${GrainImage.src})`,
        }}
      />
      {children}
    </div>
  );
};

// Memoized version for performance optimization
export const Card = memo(CardComponent);
Card.displayName = "Card";
