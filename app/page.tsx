import Image from "next/image";
import GoldCalculator from "@/components/GoldCalculator";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import { CONTACT } from "@/lib/contact";

const visitSteps = [
  {
    n: "01",
    title: "Arrive",
    copy: "A private room, never a counter in full view. You keep your pieces with you throughout.",
  },
  {
    n: "02",
    title: "Weigh & test",
    copy: "Hallmarks, karat and weight are shown to you. Nothing is assessed out of sight.",
  },
  {
    n: "03",
    title: "The figure",
    copy: "A clear offer, spoken plainly. Time to consider it without pressure.",
  },
  {
    n: "04",
    title: "Your decision",
    copy: "Accept, or leave exactly as you arrived. Either is received with the same courtesy.",
  },
];

const weSee = [
  "Hallmarked gold jewellery",
  "Broken or unworn pieces",
  "Chains, rings and bangles",
  "Gold coins and sovereigns",
  "Mixed lots, assessed item by item",
];

export default function Home() {
  return (
    <main className="flex-1">
        <Hero />
        <TrustBar />

        <section className="border-t border-gold-line/70">
          <div className="mx-auto max-w-[72rem] px-5 py-16 md:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-24">
            <Reveal className="lg:col-span-4">
              <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                A London house
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.015em] text-charcoal md:text-4xl lg:text-[2.6rem] lg:leading-tight">
                There is a quieter way to sell gold.
              </h2>
            </Reveal>
            <Reveal className="mt-8 max-w-xl lg:col-span-7 lg:col-start-6 lg:mt-10" delay={80}>
              <p className="font-serif text-xl font-medium leading-8 text-ink md:text-2xl md:leading-10">
                “We built the appointment around the client, not the other way
                round — a still room, an honest scale, and time enough to
                think.”
              </p>
              <p className="mt-6 text-sm font-medium leading-7 text-muted md:text-[0.95rem] md:leading-8">
                AZIZI JEWELLERY LIMITED sits in that older London tradition:
                discretion first, then the numbers. Whether you bring a single
                chain or a lifetime of pieces, the manner of the visit does not
                change.
              </p>
            </Reveal>
          </div>
        </section>

        <GoldCalculator />

        <section id="visit" className="scroll-mt-16 border-t border-gold-line/70 md:scroll-mt-20">
          <div className="mx-auto max-w-[72rem] px-5 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                The appointment
              </p>
              <h2 className="mt-3 max-w-lg font-serif text-3xl font-medium tracking-[-0.015em] text-charcoal md:text-4xl">
                How a visit unfolds
              </h2>
            </Reveal>

            <ol className="mt-10 grid gap-0 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
              {visitSteps.map((step, index) => (
                <Reveal
                  key={step.n}
                  as="li"
                  delay={index * 70}
                  className="border-t border-gold-line py-8 md:border-t-0 md:border-l md:px-6 md:py-0 lg:px-7"
                >
                  <span className="text-[0.7rem] tracking-[0.22em] text-champagne-dark">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-medium tracking-[-0.01em] text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.copy}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-16 border-t border-gold-line/70 md:scroll-mt-20"
        >
          <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-16 md:gap-12 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/accent-gold.jpg"
                  alt="Gold rope chain arranged on a white sculptural plinth"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                The house
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.015em] text-charcoal md:text-4xl">
                Gold buying, valuations, and a few considered pieces
              </h2>
              <div className="mt-8 space-y-8">
                <article className="border-t border-gold-line pt-6">
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.01em] text-charcoal">Gold buying</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Hallmarked gold and unwanted jewellery, valued with you in
                    the room. Settlement when you are ready.
                  </p>
                </article>
                <article className="border-t border-gold-line pt-6">
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.01em] text-charcoal">Private valuations</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    An unhurried reading of what you hold — useful whether you
                    intend to sell, insure, or simply understand.
                  </p>
                </article>
                <article className="border-t border-gold-line pt-6">
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.01em] text-charcoal">Fine jewellery</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    A small, edited selection for those who prefer to buy as
                    quietly as they sell.
                  </p>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-gold-line/70 bg-ivory-soft">
          <div className="mx-auto max-w-[72rem] px-5 py-16 md:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-24">
            <Reveal className="lg:col-span-5">
              <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                What to bring
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.015em] text-charcoal md:text-4xl">
                We see most gold that finds its way to a London jeweller.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                If you are unsure, bring it. Mixed boxes are ordinary here; we
                sort them with you, piece by piece.
              </p>
            </Reveal>
            <Reveal className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-4" delay={80}>
              <ul>
                {weSee.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between gap-6 border-b border-gold-line py-4 text-[0.95rem] font-medium text-charcoal first:border-t"
                  >
                    <span>{item}</span>
                    <span className="hidden text-[0.65rem] tracking-[0.18em] text-champagne-dark uppercase md:inline">
                      Welcome
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-16 border-t border-gold-line/70 md:scroll-mt-20"
        >
          <div className="mx-auto grid max-w-[72rem] lg:grid-cols-2">
            <Reveal className="order-2 px-5 py-16 md:px-8 md:py-20 lg:order-1 lg:flex lg:flex-col lg:justify-end lg:px-10 lg:py-24">
              <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                About
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.015em] text-charcoal md:text-4xl lg:text-[2.75rem]">
                Integrity, in every gram
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted md:text-[0.95rem] md:leading-8">
                The work is simple, and we keep it so. Weigh. Test. Explain.
                AZIZI JEWELLERY LIMITED is for clients who expect the manner of
                a jeweller and the frankness of a good merchant — never one
                without the other.
              </p>
              <p className="mt-6 max-w-md text-sm font-medium leading-7 text-ink">
                Appointments are private. Evenings can be arranged. You will
                never be asked to decide in a crowd.
              </p>
            </Reveal>
            <Reveal className="relative order-1 min-h-[18rem] md:min-h-[24rem] lg:order-2 lg:min-h-full">
              <div className="relative h-72 md:h-96 lg:absolute lg:inset-0 lg:h-auto">
                <Image
                  src="/images/atelier-gold.jpg"
                  alt="Gold necklace and earrings presented on a white jeweller’s bust"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="appointment"
          className="scroll-mt-16 border-t border-gold-line/70 md:scroll-mt-20"
        >
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/visit-gold.jpg"
                alt="Gold and diamond bracelet on a pale surface"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-charcoal/72" />
            </div>
            <div className="relative mx-auto max-w-[40rem] px-5 py-20 text-center md:px-8 md:py-24 lg:py-28">
              <Reveal>
                <p className="font-medium text-[0.68rem] tracking-[0.3em] text-champagne uppercase">
                  By appointment
                </p>
                <h2 className="mt-4 font-serif text-3xl font-medium tracking-[-0.015em] text-ivory-soft md:text-5xl">
                  Come when it suits you
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-ivory-soft/75">
                  Write with a preferred morning or afternoon. We confirm a
                  private hour — yours alone, with no waiting room of
                  strangers.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="/appointment"
                    className="inline-flex min-h-12 w-full items-center justify-center border border-ivory-soft/40 bg-ivory-soft px-7 text-[0.72rem] tracking-[0.2em] text-charcoal uppercase transition-colors hover:bg-champagne sm:w-auto"
                  >
                    Send an enquiry
                  </a>
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ivory-soft/45 px-6 text-[0.72rem] tracking-[0.18em] text-ivory-soft uppercase transition-colors hover:border-ivory-soft hover:bg-ivory-soft/10 sm:w-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.25-1.93 1.33-.49.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.29-.12.56.16.27.73 1.2 1.56 1.95 1.07.96 1.97 1.26 2.24 1.4.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.1 1.54.73 1.8.86.27.13.44.2.51.31.07.11.07.64-.17 1.32z"
                      />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
  );
}
