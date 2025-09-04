/**
 * Testimonials Feature Utils
 *
 * Utility functions for testimonials feature.
 */

import type { Testimonial } from "./types";

/**
 * Validate testimonial data
 */
export const validateTestimonial = (testimonial: unknown): testimonial is Testimonial => {
  if (typeof testimonial !== "object" || testimonial === null) {
    return false;
  }

  const t = testimonial as Record<string, unknown>;

  return (
    typeof t["name"] === "string" &&
    typeof t["text"] === "string" &&
    typeof t["position"] === "string" &&
    typeof t["company"] === "string" &&
    String(t["name"]).length > 0 &&
    String(t["text"]).length > 0
  );
};

/**
 * Format testimonial text for display
 */
export const formatTestimonialText = (text: string, maxLength = 200): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0 ? `${truncated.substring(0, lastSpaceIndex)}...` : `${truncated}...`;
};

/**
 * Generate testimonial excerpt
 */
export const getTestimonialExcerpt = (testimonial: Testimonial): string => {
  return `${testimonial.name} from ${testimonial.company}: "${formatTestimonialText(testimonial.text, 100)}"`;
};
