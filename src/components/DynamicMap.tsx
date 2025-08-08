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
  () => import("./OpenStreetMap").then((mod) => ({ default: mod.OpenStreetMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-gray-200">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  }
);

export const DynamicMap: React.FC<IDynamicMapProps> = (props) => {
  return (
    <div className="h-full w-full">
      <OpenStreetMap {...props} />
    </div>
  );
};
