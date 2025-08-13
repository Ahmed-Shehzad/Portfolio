/**
 * Contact Form Hook
 *
 * Custom hook that encapsulates all contact form logic.
 * Following bulletproof architecture by separating business logic from UI.
 */

import { useCallback, useState } from "react";
import type { ContactFormData, ContactFormState, ContactSubmissionResult } from "../types";
import { INITIAL_FORM_DATA, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../constants";
import { validateContactForm, sanitizeFormData } from "../utils";

export const useContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    data: INITIAL_FORM_DATA,
    errors: {},
    isSubmitting: false,
    submitStatus: "idle",
  });

  /**
   * Updates a single form field
   */
  const updateField = useCallback((fieldName: keyof ContactFormData, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [fieldName]: value },
      // Clear error for this field when user starts typing
      errors: { ...prev.errors, [fieldName]: undefined },
      // Reset submit status when form is modified
      submitStatus: prev.submitStatus === "success" ? "idle" : prev.submitStatus,
    }));
  }, []);

  /**
   * Validates the current form data
   */
  const validateForm = useCallback(() => {
    const validation = validateContactForm(formState.data);

    setFormState((prev) => ({
      ...prev,
      errors: validation.errors,
    }));

    return validation.isValid;
  }, [formState.data]);

  /**
   * Submits the contact form
   */
  const submitForm = useCallback(async (): Promise<ContactSubmissionResult> => {
    // Start submission
    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      submitStatus: "idle",
    }));

    try {
      // Validate form
      if (!validateForm()) {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          submitStatus: "error",
        }));

        return {
          success: false,
          message: "Please fix the errors above.",
        };
      }

      // Sanitize data
      const sanitizedData = sanitizeFormData(formState.data);

      // Simulate API call (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success response
      const result: ContactSubmissionResult = {
        success: true,
        message: SUCCESS_MESSAGE,
        data: sanitizedData,
      };

      // Update state on success
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitStatus: "success",
        // Optionally reset form
        data: INITIAL_FORM_DATA,
        errors: {},
      }));

      return result;
    } catch (error) {
      console.error("Contact form submission error:", error);

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitStatus: "error",
      }));

      return {
        success: false,
        message: ERROR_MESSAGE,
      };
    }
  }, [formState.data, validateForm]);

  /**
   * Resets the form to initial state
   */
  const resetForm = useCallback(() => {
    setFormState({
      data: INITIAL_FORM_DATA,
      errors: {},
      isSubmitting: false,
      submitStatus: "idle",
    });
  }, []);

  return {
    // State
    formData: formState.data,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    submitStatus: formState.submitStatus,

    // Actions
    updateField,
    validateForm,
    submitForm,
    resetForm,
  };
};
