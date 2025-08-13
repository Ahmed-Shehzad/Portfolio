/**
 * Contact Feature Types
 *
 * Centralized type definitions for the contact feature.
 * Following bulletproof architecture by keeping types close to their usage.
 */

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormState {
  readonly data: ContactFormData;
  readonly errors: ContactFormErrors;
  readonly isSubmitting: boolean;
  readonly submitStatus: "idle" | "success" | "error";
}

export interface ContactModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface ValidationRule {
  readonly minLength?: number;
  readonly pattern?: RegExp;
  readonly required: boolean;
}

export interface ValidationRules {
  readonly name: ValidationRule;
  readonly email: ValidationRule;
  readonly subject: ValidationRule;
  readonly message: ValidationRule;
}

// Form validation result
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: ContactFormErrors;
}

// Contact form submission result
export interface ContactSubmissionResult {
  readonly success: boolean;
  readonly message: string;
  readonly data?: ContactFormData;
}
