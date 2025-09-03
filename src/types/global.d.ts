// Main TypeScript declarations file - imports all modular declaration files
// This file serves as the central hub for all asset type declarations

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Import all modular declaration files
import "./images.d.ts";
import "./svg.d.ts";
import "./path-aliases.d.ts";
import "./explicit-images.d.ts";
import "./icons.d.ts";
import "./documents.d.ts";

// Re-export types for convenience
export type { StaticImageData } from "next/image";
export type { FC, SVGProps } from "react";
