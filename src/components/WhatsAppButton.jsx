import { FaWhatsapp } from "react-icons/fa";
import site from "../config/site";

/**
 * Floating WhatsApp button.
 * - On product pages, pass `message` with the product name + page URL so the
 *   shop receives context automatically.
 * - `floating` renders it as a fixed bottom-right bubble; otherwise it renders
 *   inline (used inside the product detail "Ask about this" button).
 */
export default function WhatsAppButton({ message, floating = true, label = "Chat on WhatsApp" }) {
  const text = encodeURIComponent(message || site.whatsappDefaultMessage);
  const href = `https://wa.me/${site.whatsappNumber}?text=${text}`;

  if (!floating) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#25D366] text-ink font-body font-bold rounded-none border-2 border-ink hover:bg-[#1ebe5b] transition-colors"
      >
        <FaWhatsapp size={20} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-ink pl-4 pr-5 py-3.5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-transform"
    >
      <FaWhatsapp size={26} />
      <span className="hidden sm:inline font-body font-bold text-sm">Ask us on WhatsApp</span>
    </a>
  );
}
