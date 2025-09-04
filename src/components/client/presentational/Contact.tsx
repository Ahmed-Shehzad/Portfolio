"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import GrainImage from "@/assets/images/grain.jpg";
import { ScrollAnimationWrapper } from "@/wrappers";
import { ComponentType, FC } from "react";

interface ContactProps {
  /** Translated strings for the contact section */
  translations: {
    title: string;
    description: string;
    buttonText: string;
  };
  /** Whether the modal is currently open */
  isModalOpen: boolean;
  /** Callback to open the modal */
  onOpenModal: () => void;
  /** Callback to close the modal */
  onCloseModal: () => void;
  /** Dynamic contact modal component */
  ContactModalComponent: ComponentType<{
    isOpen: boolean;
    onClose: () => void;
  }>;
}

/**
 * Contact Component
 *
 * Pure presentational component that renders the contact section UI.
 * Receives all data and behavior through props from ContactContainer.
 *
 * Responsibilities:
 * - Render contact section layout and styling
 * - Display translated content
 * - Handle user interactions via callback props
 * - Manage visual animations and responsive design
 *
 * @param props - ContactProps containing translations, modal state, and callbacks
 * @returns JSX.Element - Contact section with call-to-action and modal integration
 */
export const Contact: FC<ContactProps> = ({
  translations,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  ContactModalComponent,
}) => {
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
                <h2 className="font-serif text-2xl md:text-3xl">{translations.title}</h2>
                <p className="mt-2 text-sm md:text-base">{translations.description}</p>
              </div>
              <div>
                <button
                  onClick={onOpenModal}
                  className="inline-flex h-12 w-max cursor-pointer items-center gap-2 rounded-xl border border-gray-900 bg-gray-900 px-6 text-white backdrop-blur-[1px] transition-all duration-300 text-shadow-white hover:border hover:border-neutral-900/20 hover:bg-neutral-900/30 hover:shadow-[5px_5px_0_rgba(255,255,255,0.1)]"
                >
                  <span className="font-semibold">{translations.buttonText}</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
      <ContactModalComponent isOpen={isModalOpen} onClose={onCloseModal} />
    </div>
  );
};
