import { CONTACT } from "@/lib/contact";

export const socialLinks = {
  tiktok: "https://www.tiktok.com/@azizijewellery",
  facebook: "https://www.facebook.com/azizijewellery",
  whatsapp: CONTACT.whatsappUrl,
} as const;

export const socialItems = [
  { id: "tiktok", label: "TikTok", href: socialLinks.tiktok },
  { id: "facebook", label: "Facebook", href: socialLinks.facebook },
  { id: "whatsapp", label: "WhatsApp", href: socialLinks.whatsapp },
] as const;

export type SocialId = (typeof socialItems)[number]["id"];
