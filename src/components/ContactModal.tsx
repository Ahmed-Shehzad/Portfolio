"use client";

import GrainImage from "@/assets/images/grain.jpg";
import { FormEvent, useState } from "react";
import { Modal } from "./Modal";

interface IContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: IContactModalProps) => {
  // Validation constants for easy configuration
  const VALIDATION_RULES = {
    name: { minLength: 2 },
    subject: { minLength: 3 },
    message: { minLength: 10 },
    email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  } as const;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    subject?: boolean;
    message?: boolean;
  }>({});

  // Validation helper functions
  const validateName = (value: string): string => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "Name is required";
    if (trimmedValue.length < VALIDATION_RULES.name.minLength) {
      return `Name must be at least ${VALIDATION_RULES.name.minLength} characters`;
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "Email is required";
    if (!VALIDATION_RULES.email.pattern.test(trimmedValue)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateSubject = (value: string): string => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "Subject is required";
    if (trimmedValue.length < VALIDATION_RULES.subject.minLength) {
      return `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters`;
    }
    return "";
  };

  const validateMessage = (value: string): string => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "Message is required";
    if (trimmedValue.length < VALIDATION_RULES.message.minLength) {
      return `Message must be at least ${VALIDATION_RULES.message.minLength} characters`;
    }
    return "";
  };

  // Field validators mapping for better maintainability
  const fieldValidators: Record<string, (value: string) => string> = {
    name: validateName,
    email: validateEmail,
    subject: validateSubject,
    message: validateMessage,
  };

  const validateField = (name: string, value: string): string => {
    const validator = fieldValidators[name];
    return validator ? validator(value) : "";
  };

  const validateForm = (): boolean => {
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof typeof formData;

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear existing error for this field
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }

    // Mark field as touched if not already
    if (!touched[fieldName]) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    }

    // Perform real-time validation for touched fields
    if (touched[fieldName]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof typeof formData;

    // Mark field as touched and validate
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  // Utility function to reset form to initial state
  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitStatus("idle");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    const allFieldsTouched = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allFieldsTouched);

    // Validate the form
    if (!validateForm()) {
      return; // Don't submit if form is invalid
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Contact form data:", formData);

      setSubmitStatus("success");

      // Reset form and close modal after successful submission
      setTimeout(() => {
        resetForm();
        onClose(); // Only close after successful submission
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
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
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-medium text-white transition-all hover:from-emerald-500 hover:to-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
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
