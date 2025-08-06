"use client";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import React from "react";

interface IDynamicMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  markerImage?: StaticImageData;
}

// Dynamically import the OpenStreetMap component to avoid SSR issues
const OpenStreetMap = dynamic(
  () =>
    import("./OpenStreetMap").then((mod) => ({ default: mod.OpenStreetMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  }
);

export const DynamicMap: React.FC<IDynamicMapProps> = (props) => {
  return <OpenStreetMap {...props} />;
};
