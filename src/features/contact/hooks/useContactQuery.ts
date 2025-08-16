/**
 * Contact React Query Hooks
 *
 * Custom hooks using React Query for contact-related API operations.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios-client";
import { queryKeys } from "@/lib/query/config";
import { secureLog } from "@/shared/utils/logging";
import type { ContactFormData, ContactSubmissionResult } from "../types";

// Constants to avoid magic numbers
const FORM_SUBMISSION_DELAY = 1500;

/**
 * Hook for submitting contact form using React Query mutation
 */
export const useSubmitContactForm = (options?: {
  onSuccess?: (data: ContactSubmissionResult, variables: ContactFormData) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contact", "submit"],

    mutationFn: async (formData: ContactFormData): Promise<ContactSubmissionResult> => {
      // For now, simulate API call
      // In a real app, this would call the actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, FORM_SUBMISSION_DELAY));

      // In development, you can manually trigger errors by modifying this
      // No random failures to avoid SonarQube security warnings

      return {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        data: formData,
      };

      // Actual implementation would be:
      // const response = await api.post<ContactSubmissionResult>('/contact', formData);
      // if (!response.success) {
      //   throw new Error(response.error || 'Failed to submit contact form');
      // }
      // return response.data!;
    },

    onSuccess: (data, variables) => {
      // Invalidate and refetch contact-related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.contact(),
      });

      // You could also update cache directly if needed
      queryClient.setQueryData(queryKeys.contactSubmit(variables), data);

      // Call custom onSuccess callback if provided
      options?.onSuccess?.(data, variables);
    },

    onError: (error) => {
      secureLog.error(
        "Contact form submission failed:",
        error instanceof Error ? error.message : "Unknown error"
      );

      // Call custom onError callback if provided
      options?.onError?.(error);
    },
  });
};

/**
 * Hook for checking contact form submission history (if needed)
 */
export const useContactSubmissionHistory = () => {
  return useMutation({
    mutationKey: ["contact", "history"],

    mutationFn: async (): Promise<ContactSubmissionResult[]> => {
      // This would fetch submission history from API
      const response = await api.get<ContactSubmissionResult[]>("/contact/history");

      if (!response.success) {
        throw new Error(response.error ?? "Failed to fetch contact history");
      }

      return response.data ?? [];
    },
  });
};

/**
 * Hook for validating email address via API (if needed)
 */
export const useValidateEmail = () => {
  return useMutation({
    mutationKey: ["contact", "validate-email"],

    mutationFn: async (email: string): Promise<{ isValid: boolean; reason?: string }> => {
      const response = await api.post<{ isValid: boolean; reason?: string }>(
        "/contact/validate-email",
        { email }
      );

      if (!response.success) {
        throw new Error(response.error ?? "Failed to validate email");
      }

      return response.data ?? { isValid: false, reason: "Unknown error" };
    },
  });
};
