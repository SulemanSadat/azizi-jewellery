import { CONTACT } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <div className="whatsapp-cta fixed right-4 z-[60] flex items-center gap-3 md:right-6">
      <span className="whatsapp-note max-w-[8.5rem] bg-ivory-soft px-3 py-2.5 text-[0.65rem] leading-4 tracking-[0.08em] text-charcoal uppercase md:max-w-[11rem] md:px-4 md:py-3 md:text-[0.7rem] md:leading-5">
        Private valuation?
      </span>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message AZIZI on WhatsApp"
        className="whatsapp-fab group flex h-12 w-12 items-center justify-center rounded-full md:h-[3.25rem] md:w-[3.25rem]"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[1.35rem] w-[1.35rem] text-ivory-soft transition-transform duration-300 group-hover:scale-[1.04] md:h-6 md:w-6"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.25-1.93 1.33-.49.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.29-.12.56.16.27.73 1.2 1.56 1.95 1.07.96 1.97 1.26 2.24 1.4.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.1 1.54.73 1.8.86.27.13.44.2.51.31.07.11.07.64-.17 1.32z"
          />
        </svg>
      </a>
    </div>
  );
}
