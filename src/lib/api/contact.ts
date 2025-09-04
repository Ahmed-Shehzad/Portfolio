/**
 * Contact API
 *
 * API functions for contact form submission.
 */

import type { ContactFormData, ContactSubmissionResult } from "@/features/contact";
import { secureLog } from "@/shared/utils/logging";

/**
 * Submits contact form data to the API endpoint with locale tracking
 */
export const submitContactForm = async (
  data: ContactFormData,
  locale: string = "en"
): Promise<ContactSubmissionResult> => {
  try {
    const response = await fetch(`/${locale}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ContactSubmissionResult = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to submit contact form");
    }

    return result;
  } catch (error) {
    secureLog.error(
      "Contact form submission error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again.",
    };
  }
};
