/**
 * Contact React Query Hooks
 *
 * Custom hooks using React Query for contact-related API operations.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { submitContactForm } from "@/lib/api/contact";
import { api } from "@/lib/api/client";
import { queryKeys } from "@/lib/query/config";
import { secureLog } from "@/shared/utils/logging";
import type { ContactFormData, ContactSubmissionResult } from "../types";

/**
 * Hook for submitting contact form using React Query mutation
 */
export const useSubmitContactForm = (options?: {
  onSuccess?: (data: ContactSubmissionResult, variables: ContactFormData) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const locale = useLocale();

  return useMutation({
    mutationKey: ["contact", "submit", locale],

    mutationFn: async (formData: ContactFormData): Promise<ContactSubmissionResult> => {
      // Use the actual API function with locale tracking
      return await submitContactForm(formData, locale);
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
