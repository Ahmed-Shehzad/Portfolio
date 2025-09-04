"use client";

import { DynamicContactModal } from "@/lib/optimization/dynamic-imports";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { Contact } from "../presentational/Contact";

/**
 * ContactContainer
 *
 * Container component that handles all business logic and state for the contact section.
 *
 * Responsibilities:
 * - Manage modal state (open/closed)
 * - Handle user interactions (open/close modal)
 * - Provide translations to the presentational component
 * - Connect with external dependencies (i18n, dynamic components)
 */
export const ContactContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("contact");

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const translations = {
    title: t("title"),
    description: t("description"),
    buttonText: t("buttonText"),
  };

  return (
    <Contact
      translations={translations}
      isModalOpen={isModalOpen}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      ContactModalComponent={DynamicContactModal}
    />
  );
};
