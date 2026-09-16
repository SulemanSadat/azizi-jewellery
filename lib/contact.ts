const whatsappMessage = encodeURIComponent(
  "Hello AZIZI JEWELLERY, I came through your website and would like to enquire about selling gold or booking a private appointment.",
);

export const CONTACT = {
  phoneDisplay: "+44 7462 832287",
  phoneTel: "+447462832287",
  whatsappUrl: `https://wa.me/447462832287?text=${whatsappMessage}`,
} as const;
