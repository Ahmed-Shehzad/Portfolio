/**
 * Contact Form Validation Utilities
 *
 * Pure validation functions following bulletproof architecture principles.
 * These are testable, side-effect free functions.
 */

import type { ContactFormData, ContactFormErrors, ValidationResult } from "./types";
import { VALIDATION_RULES, MAX_EMAIL_LENGTH } from "./constants";

/**
 * Validates a single form field
 */
export const validateField = (
  fieldName: keyof ContactFormData,
  value: string
): string | undefined => {
  const rule = VALIDATION_RULES[fieldName];

  if (rule.required && !value.trim()) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }

  if (rule.minLength && value.trim().length < rule.minLength) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rule.minLength} characters`;
  }

  // Additional email length validation (check before pattern)
  if (fieldName === "email" && value.length > MAX_EMAIL_LENGTH) {
    return "Email address is too long";
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    if (fieldName === "email") {
      return "Please enter a valid email address";
    }
    return `Invalid ${fieldName} format`;
  }

  return undefined;
};

/**
 * Validates the entire contact form
 */
export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: ContactFormErrors = {};

  // Validate each field
  (Object.keys(data) as Array<keyof ContactFormData>).forEach((fieldName) => {
    const error = validateField(fieldName, data[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Sanitizes form data to prevent XSS and other issues
 */
export const sanitizeFormData = (data: ContactFormData): ContactFormData => {
  return {
    name: data.name.trim().slice(0, 100), // Limit to reasonable length
    email: data.email.trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH),
    subject: data.subject.trim().slice(0, 200),
    message: data.message.trim().slice(0, 2000), // Limit message length
  };
};
