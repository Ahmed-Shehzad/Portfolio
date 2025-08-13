// Contact form feature domain types

export interface ContactValidationFieldResult {
  isValid: boolean;
  message: string;
}
export interface ContactValidationResult {
  validation: Record<string, ContactValidationFieldResult>;
  isFormValid: boolean;
}
