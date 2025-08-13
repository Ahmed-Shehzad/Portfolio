/**
 * Contact Feature Constants
 *
 * Configuration and validation rules for the contact feature.
 */

import type { ValidationRules } from "./types";

// Safe, bounded email regex (linear) + validation constants
// Limits local part to 1-64 chars; domain labels to 1-63; requires at least one dot.
// Avoids nested quantifiers/backtracking hotspots that could enable ReDoS.
export const SAFE_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;

export const MAX_EMAIL_LENGTH = 254; // Common practical maximum

export const VALIDATION_RULES: ValidationRules = {
  name: { minLength: 2, required: true },
  subject: { minLength: 3, required: true },
  message: { minLength: 10, required: true },
  email: { pattern: SAFE_EMAIL_REGEX, required: true },
} as const;

export const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  subject: "",
  message: "",
} as const;

export const FORM_FIELD_LABELS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
} as const;

export const FORM_PLACEHOLDERS = {
  name: "Enter your full name",
  email: "Enter your email address",
  subject: "What would you like to discuss?",
  message: "Tell me about your project or inquiry...",
} as const;

export const SUCCESS_MESSAGE = "Thank you for your message! I'll get back to you soon.";
export const ERROR_MESSAGE = "Sorry, there was an error sending your message. Please try again.";
