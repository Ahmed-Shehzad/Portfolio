/**
 * Testimonials Feature Constants
 *
 * Constants and configuration for testimonials feature.
 */

export const TESTIMONIALS_CONFIG = {
  maxTestimonials: 10,
  autoPlayInterval: 5000,
  transitionDuration: 300,
} as const;

export const TESTIMONIALS_ENDPOINTS = {
  list: "/testimonials",
  submit: "/testimonials/submit",
} as const;
