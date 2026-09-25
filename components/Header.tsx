"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { CONTACT } from "@/lib/contact";
import { navLinks } from "@/lib/nav";

function Logo() {
  return (
    <Link href="/" className="group flex min-h-11 items-center gap-2.5 md:gap-3">
      <span className="flex h-8 w-8 items-center justify-center border border-gold-line text-champagne-dark md:h-9 md:w-9">
        <svg viewBox="0 0 32 32" className="h-4 w-4 md:h-[1.1rem] md:w-[1.1rem]" aria-hidden="true">
          <circle cx="16" cy="18.2" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="8.4" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.2rem] tracking-[0.22em] text-charcoal md:text-[1.35rem]">
          AZIZI
        </span>
        <span className="mt-1 text-[0.58rem] tracking-[0.36em] text-champagne-dark md:tracking-[0.42em]">
          JEWELLERY
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, ready } = useAuth();
  const accountHref = ready && user ? "/account" : "/login";
  const accountLabel = ready && user ? "Account" : "Sign in";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background,border-color] duration-300 ${
          scrolled
            ? "border-b border-gold-line/80 bg-ivory-soft/90 backdrop-blur-md"
            : "border-b border-gold-line/50 bg-ivory"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[72rem] items-center justify-between gap-6 px-5 md:h-[4.5rem] md:px-8 lg:h-20 lg:gap-10 lg:px-10">
          <Logo />

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-7 lg:flex xl:gap-10" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.72rem] tracking-[0.22em] text-ink uppercase transition-colors hover:text-champagne-dark"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              href={accountHref}
              className="hidden min-h-11 items-center text-[0.68rem] tracking-[0.2em] text-ink uppercase transition-colors hover:text-champagne-dark lg:inline-flex"
            >
              {accountLabel}
            </Link>
            <Link
              href="/appointment"
              className="hidden min-h-11 items-center justify-center border border-charcoal bg-charcoal px-5 text-[0.68rem] tracking-[0.2em] text-ivory-soft uppercase transition-colors hover:border-champagne-dark hover:bg-champagne-dark lg:inline-flex"
            >
              Book an Appointment
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-gold-line text-charcoal lg:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className={`fixed inset-0 z-40 bg-ivory pt-16 transition-[opacity,transform,filter] duration-500 ease-out md:pt-[4.5rem] lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
            : "pointer-events-none -translate-y-3 opacity-0 blur-[2px]"
        }`}
        aria-hidden={!open}
      >
          <nav
            className="flex h-full flex-col justify-between px-5 py-8 md:px-8 md:py-12"
            aria-label="Menu"
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`border-b border-gold-line py-4 font-serif text-[2rem] leading-none text-charcoal transition-[opacity,transform] duration-500 md:text-4xl ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/appointment"
                className={`border-b border-gold-line py-4 font-serif text-[2rem] leading-none text-charcoal transition-[opacity,transform] duration-500 md:text-4xl ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + navLinks.length * 55}ms` : "0ms" }}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                Book an Appointment
              </Link>
              <Link
                href={accountHref}
                className={`border-b border-gold-line py-4 font-serif text-[2rem] leading-none text-charcoal transition-[opacity,transform] duration-500 md:text-4xl ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + (navLinks.length + 1) * 55}ms` : "0ms" }}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {accountLabel}
              </Link>
            </div>
            <p
              className={`max-w-xs pb-6 text-sm leading-7 text-muted transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? "320ms" : "0ms" }}
            >
              Gold buying and fine jewellery, by appointment in London.
              <br />
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="mt-2 inline-block text-charcoal"
                tabIndex={open ? 0 : -1}
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </nav>
        </div>
    </>
  );
}
