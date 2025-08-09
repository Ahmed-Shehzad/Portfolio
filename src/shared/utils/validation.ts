// Shared validation utilities
// Centralizes email validation to ensure consistent, safe, linear-time checks across app & worker.

export const MAX_EMAIL_LENGTH = 254; // Practical RFC guideline

// Safe email regex (not full RFC 5322). Focuses on security & performance:
// - Bounded quantifiers in local (1-64) & domain labels (1-63)
// - Requires at least one dot in domain
// - Avoids catastrophic backtracking patterns
export const SAFE_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;

export function validateEmail(raw: string): { isValid: boolean; message: string } {
  const value = (raw || "").trim();
  const isValid = value.length <= MAX_EMAIL_LENGTH && SAFE_EMAIL_REGEX.test(value);
  return {
    isValid,
    message: isValid ? "" : "Please enter a valid email address",
  };
}
