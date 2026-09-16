import type { ReactNode } from "react";
import type { SocialId } from "@/lib/social";

type IconProps = {
  className?: string;
};

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3.1c.7 1.9 2.2 3.4 4.2 4.1v2.5c-1.5-.05-2.9-.5-4.1-1.3v6.6c0 3.4-2.8 6.1-6.2 6.1S1.9 18.4 1.9 15c0-3.4 2.8-6.1 6.2-6.1.3 0 .7 0 1 .1v2.7c-.3-.1-.7-.2-1-.2-1.9 0-3.5 1.5-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.5 3.5-3.5V3.1h2.6z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.6 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5V21h2.9z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.25-1.93 1.33-.49.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.29-.12.56.16.27.73 1.2 1.56 1.95 1.07.96 1.97 1.26 2.24 1.4.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.1 1.54.73 1.8.86.27.13.44.2.51.31.07.11.07.64-.17 1.32z"
      />
    </svg>
  );
}

const icons: Record<SocialId, (props: IconProps) => ReactNode> = {
  tiktok: TikTokIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  const Icon = icons[id];
  return <Icon className={className} />;
}
