"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GrainImage from "@/assets/images/grain.jpg";
import { ContactModal } from "@/components/features";
import { ScrollAnimationWrapper } from "@/wrappers";
import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * ContactSection
 *
 * Call-to-action band encouraging direct contact, opening a modal form.
 *
 * Features:
 * - Decorative grain background + gradient brand styling.
 * - ScrollAnimationWrapper for scale / entrance effect.
 * - Opens ContactModal (portal) while keeping state local.
 *
 * Accessibility:
 * - Uses semantic button; modal presumed to handle focus trap & aria attributes.
 * - High contrast text inside gradient background.
 */
export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("contact");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="contact" className="py-16 pt-12 md:px-24 lg:py-24 lg:pt-20">
      <div className="container">
        <ScrollAnimationWrapper animation="scaleIn">
          <div className="relative z-0 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-300 to-sky-400 px-10 py-8 text-center text-gray-900 md:*:text-left">
            <div
              className="absolute inset-0 -z-10 opacity-5"
              style={{
                backgroundImage: `url(${GrainImage.src})`,
              }}
            />
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">{t("title")}</h2>
                <p className="mt-2 text-sm md:text-base">{t("description")}</p>
              </div>
              <div>
                <button
                  onClick={handleOpenModal}
                  className="inline-flex h-12 w-max cursor-pointer items-center gap-2 rounded-xl border border-gray-900 bg-gray-900 px-6 text-white backdrop-blur-[1px] transition-all duration-300 text-shadow-white hover:border hover:border-neutral-900/20 hover:bg-neutral-900/30 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)]"
                >
                  <span className="font-semibold">{t("button")}</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
