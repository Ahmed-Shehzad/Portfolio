/**
 * Contact Feature Exports
 *
 * Barrel export for the contact feature following bulletproof architecture.
 * This provides a clean API for importing contact-related functionality.
 */

// Types
export type {
  ContactFormData,
  ContactFormErrors,
  ContactFormState,
  ContactModalProps,
  ValidationRule,
  ValidationRules,
  ValidationResult,
  ContactSubmissionResult,
} from "./types";

// Components
export { ContactModal } from "./components";

// Constants
export {
  SAFE_EMAIL_REGEX,
  MAX_EMAIL_LENGTH,
  VALIDATION_RULES,
  INITIAL_FORM_DATA,
  FORM_FIELD_LABELS,
  FORM_PLACEHOLDERS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from "./constants";

// Utils
export { validateField, validateContactForm, sanitizeFormData } from "./utils";

// Hooks
export { useContactForm } from "./hooks/useContactForm";

// Components (when we refactor the existing ContactModal)
// export { ContactModal } from './components/ContactModal';
// export { ContactForm } from './components/ContactForm';
