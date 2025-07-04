import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type HeroOrbitProps = {
  size: number;
  rotation: number;
  orbitDuration?: string;
  spinDuration?: string;
  shouldOrbit?: boolean;
  shouldSpin?: boolean;
};

export const HeroOrbit: FC<PropsWithChildren<HeroOrbitProps>> = (props) => {
  const {
    size,
    rotation,
    orbitDuration,
    spinDuration,
    shouldOrbit = false,
    shouldSpin = false,
    children,
  } = props;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
      <div
        className={twMerge(shouldOrbit === true && "animate-spin")}
        style={{
          animationDuration: orbitDuration,
        }}
      >
        <div
          className="flex items-start justify-start"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div
            className={twMerge(shouldSpin === true && "animate-spin")}
            style={{
              animationDuration: spinDuration,
            }}
          >
            <div
              className="inline-flex"
              style={{ transform: `rotate(${rotation * -1}deg)` }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
