const benefits = [
  {
    title: "Private appointments",
    copy: "A quiet London setting, never a public counter.",
    icon: "M12 3.75 5.75 6.5v4.8c0 3.85 2.55 7.45 6.25 8.95 3.7-1.5 6.25-5.1 6.25-8.95V6.5L12 3.75z",
  },
  {
    title: "Tested with you",
    copy: "Your gold is weighed and assessed in your presence.",
    icon: "M6 8.25h12M8.25 8.25l-2.5 6.25h5L8.25 8.25zm7.5 0-2.5 6.25h5l-2.5-6.25zM12 4.5v15",
  },
  {
    title: "Clear offer",
    copy: "A transparent figure before you decide.",
    icon: "M7 7.75h10M7 12h10M7 16.25h6M5.75 3.75h12.5v16.5H5.75z",
  },
  {
    title: "No pressure",
    copy: "Accept, consider, or leave with complete courtesy.",
    icon: "M12 5.25v6l4 2.5M20.25 12A8.25 8.25 0 1 1 3.75 12a8.25 8.25 0 0 1 16.5 0z",
  },
];

export default function TrustBar() {
  return (
    <section
      className="border-y border-gold-line/70 bg-ivory-soft"
      aria-label="Why clients choose AZIZI"
    >
      <div className="mx-auto max-w-[72rem] px-5 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mb-7 flex flex-col gap-2 border-b border-gold-line/70 pb-5 md:flex-row md:items-end md:justify-between">
          <p className="text-[0.66rem] tracking-[0.28em] text-champagne-dark uppercase">
            Why clients choose AZIZI
          </p>
          <p className="max-w-md text-sm leading-6 text-muted md:text-right">
            Quiet expertise, transparent handling, and a decision made in your
            own time.
          </p>
        </div>
        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <article
            key={benefit.title}
            className="group border-t border-gold-line/60 py-6 first:border-t-0 md:px-6 md:[&:nth-child(-n+2)]:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0 lg:px-7"
          >
            <span
              className="trust-icon trust-icon--premium flex h-11 w-11 items-center justify-center border border-gold-line/80 text-champagne-dark"
              style={{ animationDelay: `${index * 180}ms` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d={benefit.icon}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.35"
                />
              </svg>
            </span>
            <div className="mt-5">
              <h2 className="font-serif text-2xl leading-none text-charcoal">
                {benefit.title}
              </h2>
              <p className="mt-3 max-w-[15rem] text-sm leading-6 text-muted">
                {benefit.copy}
              </p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
