import { motion } from "framer-motion";
import { BUSINESS } from "../../lib/business";

export default function WhatsAppButton() {
  const msg = encodeURIComponent(
    "Hi CleanDrive! I'd like to know more about your doorstep car wash plans."
  );
  const href = `https://wa.me/${BUSINESS.waNumber}?text=${msg}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-button"
      aria-label="Chat with CleanDrive on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-5 text-white shadow-xl transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .04 5.37.04 12c0 2.11.55 4.17 1.6 6L0 24l6.14-1.6a11.99 11.99 0 0 0 5.88 1.52h.01c6.62 0 11.99-5.37 11.99-12 0-3.2-1.25-6.21-3.5-8.44ZM12.03 21.4h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.64.95.97-3.55-.22-.36a9.36 9.36 0 0 1-1.44-5c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.64 2.75a9.34 9.34 0 0 1 2.75 6.66c0 5.18-4.22 9.4-9.32 9.46Zm5.15-7.06c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.68-1.57-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48l-.54-.01c-.19 0-.49.07-.75.35s-.99.97-.99 2.36c0 1.39 1.02 2.74 1.16 2.93.14.19 2 3.06 4.85 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </span>
      <span className="hidden text-sm font-semibold sm:inline">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
