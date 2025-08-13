// Domain types for Testimonials feature (shared across UI & worker-facing code)

export interface Testimonial {
  rating: number;
  text: string;
  name: string;
  company: string;
  [k: string]: unknown;
}

export interface ProcessedTestimonial extends Testimonial {
  stars: Array<{ filled: boolean; index: number; key: string }>;
  textMetrics: { length: number; wordCount: number; estimatedReadTime: number };
  companyColor: string;
  ariaLabel: string;
}
