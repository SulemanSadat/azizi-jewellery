import Image from "next/image";

export default function Hero() {
  return (
    <section id="sell-gold" className="scroll-mt-16 md:scroll-mt-20">
      <div className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden md:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-5rem)]">
        <Image
          src="/images/visit-gold.jpg"
          alt="Gold and diamond bracelet on a pale surface"
          fill
          sizes="100vw"
          className="object-cover object-center"
          preload
        />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(42_39_35_/_0.22)_0%,rgb(42_39_35_/_0.1)_36%,rgb(42_39_35_/_0.38)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[72rem] flex-col items-center px-5 py-16 text-center md:px-8 lg:px-10">
          <p className="text-[0.68rem] tracking-[0.32em] text-ivory-soft/80 uppercase">
            London · Private gold buying
          </p>
          <h1 className="mt-5 font-serif text-[3.15rem] leading-none font-medium text-ivory-soft md:text-[5.8rem] lg:text-[8rem]">
            Sell Your Gold
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory-soft/78 md:mt-7 md:text-base md:leading-8">
            We receive gold and jewellery in a quiet room, weigh and test in
            your presence, and explain the figure before you decide.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 md:mt-10 md:max-w-none md:flex-row md:items-center md:justify-center md:gap-8">
            <a
              href="/appointment"
              className="inline-flex min-h-12 items-center justify-center border border-ivory-soft bg-ivory-soft px-7 text-[0.72rem] tracking-[0.2em] text-charcoal uppercase transition-colors hover:border-champagne hover:bg-champagne"
            >
              Arrange a visit
            </a>
            <a
              href="#calculator"
              className="inline-flex min-h-12 items-center justify-center border border-ivory-soft/45 px-7 text-[0.72rem] tracking-[0.18em] text-ivory-soft uppercase transition-colors hover:border-ivory-soft hover:bg-ivory-soft/10"
            >
              Gold calculator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
