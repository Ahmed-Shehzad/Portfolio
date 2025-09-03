/**
 * Testimonials Feature Barrel Export
 *
 * Following bulletproof architecture pattern for feature organization.
 */

// Types
export type { Testimonial } from "./types";

// Constants
export { TESTIMONIALS_CONFIG, TESTIMONIALS_ENDPOINTS } from "./constants";

// Hooks
export { useTestimonials, useTestimonialCarousel } from "./hooks";

// Utils
export { validateTestimonial, formatTestimonialText, getTestimonialExcerpt } from "./utils";
