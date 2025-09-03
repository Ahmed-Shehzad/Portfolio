/**
 * Dynamic Contact Modal Component
 *
 * Lazy loads the ContactModal component to reduce initial bundle size.
 * The ContactModal is only loaded when the user needs to contact.
 */

import dynamic from "next/dynamic";
import { ComponentProps, FC } from "react";

// Dynamic import with loading fallback
const ContactModalComponent = dynamic(
  () =>
    import("@/features/contact/components/ContactModal").then((mod) => ({
      default: mod.ContactModal,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
          <p className="text-sm text-white/60">Loading contact form...</p>
        </div>
      </div>
    ),
    ssr: false, // Contact modal is user interaction dependent
  }
);

type ContactModalProps = ComponentProps<typeof ContactModalComponent>;

/**
 * Wrapper component that provides the same interface as the original ContactModal
 * but loads it dynamically to improve initial bundle size
 */
export const DynamicContactModal: FC<ContactModalProps> = (props) => {
  return <ContactModalComponent {...props} />;
};

export default DynamicContactModal;
