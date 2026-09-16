import SocialLinks from "@/components/SocialLinks";
import { CONTACT } from "@/lib/contact";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-16 overflow-x-clip border-t border-gold-line bg-ivory-soft md:scroll-mt-20"
    >
      <div className="relative z-10 mx-auto grid max-w-[72rem] gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="font-serif text-2xl tracking-[0.18em] text-charcoal">AZIZI</p>
          <p className="mt-1 text-[0.62rem] tracking-[0.36em] text-champagne-dark">
            JEWELLERY LIMITED
          </p>
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
            Gold buying and fine jewellery. A London house, by appointment.
          </p>
          <SocialLinks className="mt-6" />
        </div>
        <div className="md:justify-self-end lg:justify-self-center">
          <p className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Visit
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            London, United Kingdom
            <br />
            Private appointments only
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-4 inline-flex min-h-10 items-center text-sm tracking-[0.04em] text-charcoal hover:text-champagne-dark"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>
        <div className="lg:justify-self-end">
          <p className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            On this page
          </p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-ink" aria-label="Footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-10 py-1 hover:text-champagne-dark"
              >
                {link.label}
              </a>
            ))}
            <a href="/appointment" className="min-h-10 py-1 hover:text-champagne-dark">
              Book an Appointment
            </a>
          </nav>
        </div>
      </div>
      <div className="relative z-10 border-t border-gold-line/70">
        <p className="mx-auto max-w-[72rem] px-5 py-6 text-[0.68rem] tracking-[0.16em] text-muted uppercase md:px-8 lg:px-10">
          © 2026 Azizi Jewellery Limited
        </p>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        <p className="footer-wordmark__text">AZIZI JEWELLERY</p>
      </div>
    </footer>
  );
}
