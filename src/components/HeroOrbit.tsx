import React, { FC, PropsWithChildren } from "react";

type HeroOrbitProps = {
  size: number;
  rotation: number;
};

export const HeroOrbit: FC<PropsWithChildren<HeroOrbitProps>> = (props) => {
  const { size, rotation, children } = props;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="flex items-start justify-start"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${rotation}deg)`,
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
  );
};
