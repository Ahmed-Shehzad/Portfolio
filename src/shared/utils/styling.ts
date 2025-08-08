import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines conditional classes and resolves Tailwind conflicts
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  const classes = inputs.filter(Boolean).join(" ");
  return twMerge(classes);
}
