"use client";

import GrainImage from "@/assets/images/grain.jpg";
import { Modal } from "@/components/ui";
import { useBfcacheCompatibleTimeout } from "@/hooks/useBfcacheCompatible";
import { FormEvent, useCallback, useState } from "react";

interface IContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Safe, bounded email regex (linear) + validation constants
// - Limits local part to 1-64 chars; domain labels to 1-63; requires at least one dot.
// - Avoids nested quantifiers/backtracking hotspots that could enable ReDoS.
const SAFE_EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;
const MAX_EMAIL_LENGTH = 254; // Common practical maximum

const VALIDATION_RULES = {
  name: { minLength: 2, required: true },
  subject: { minLength: 3, required: true },
  message: { minLength: 10, required: true },
  email: { pattern: SAFE_EMAIL_REGEX, required: true },
} as const;

type ValidationRule = {
  minLength?: number;
  pattern?: RegExp;
  required: boolean;
};

export const ContactModal = ({ isOpen, onClose }: IContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { setBfcacheTimeout } = useBfcacheCompatibleTimeout();
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  // Generic validation function
  const validateField = useCallback((fieldName: string, value: string): string => {
    const trimmedValue = value.trim();
    const rules = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES] as ValidationRule;

    if (!rules) return "";

    // Check if field is required
    if (rules.required && !trimmedValue) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    // Check minimum length
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters`;
    }

    // Check pattern (for email) with length guard
    if (
      fieldName === "email" &&
      (trimmedValue.length > MAX_EMAIL_LENGTH ||
        (rules.pattern && !rules.pattern.test(trimmedValue)))
    ) {
      return "Please enter a valid email address";
    }

    return "";
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: typeof errors = {};
    const formFields = Object.keys(formData) as (keyof typeof formData)[];

    // Validate all fields and collect errors
    formFields.forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);

    // Return true if no errors found
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof typeof formData;

      // Update form data
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear existing error for this field and perform real-time validation
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof typeof formData;

      // Validate field on blur

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    [validateField]
  );

  // Utility function to reset form to initial state
  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSubmitStatus("idle");
  }, []);

  const handleCancel = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Validate the form
      if (!validateForm()) {
        return; // Don't submit if form is invalid
      }

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        // Simulate API call - replace with your actual endpoint
        await new Promise((resolve) => setBfcacheTimeout(() => resolve(undefined), 2000));

        // Send the data to your backend endpoint
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

        setSubmitStatus("success");

        // Reset form and close modal after successful submission
        setBfcacheTimeout(() => {
          resetForm();
          onClose(); // Only close after successful submission
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, resetForm, onClose, setBfcacheTimeout]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${GrainImage.src})`,
          }}
        />

        {/* Header */}
        <div className="relative border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Let&apos;s Work Together
            </h2>
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <div className="relative px-6 py-6">
          {submitStatus === "success" && (
            <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Sorry, there was an error sending your message. Please try again.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:ring-1 focus:outline-none ${
                    errors.name
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:border-sky-400 focus:ring-sky-400"
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:ring-1 focus:outline-none ${
                    errors.email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:border-sky-400 focus:ring-sky-400"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:ring-1 focus:outline-none ${
                  errors.subject
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:border-sky-400 focus:ring-sky-400"
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:ring-1 focus:outline-none ${
                  errors.message
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:border-sky-400 focus:ring-sky-400"
                }`}
                placeholder="Tell me about your project or inquiry..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-medium text-white transition-all hover:from-emerald-500 hover:to-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
