/**
 * Contact API
 *
 * API functions for contact form submission.
 */

import type { ContactFormData, ContactSubmissionResult } from "@/features/contact";

/**
 * Submits contact form data
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactSubmissionResult> => {
  try {
    // For now, this is a mock implementation
    // Replace with actual API endpoint when backend is available
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success response
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      data,
    };

    // Actual implementation would use the Axios client:
    // const response = await api.post<ContactSubmissionResult>(
    //   '/api/contact',
    //   data
    // );
    // return response.data;
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again.",
    };
  }
};
