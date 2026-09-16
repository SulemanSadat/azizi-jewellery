import Image from "next/image";
import AppointmentForm from "@/components/AppointmentForm";
import Reveal from "@/components/Reveal";
import { publicAsset } from "@/lib/assets";
import { CONTACT } from "@/lib/contact";

export default function Appointment() {
  return (
    <main className="flex-1">
      <section className="border-b border-gold-line/70">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={publicAsset("/images/visit-gold.jpg")}
              alt="Gold and diamond bracelet on a pale surface"
              fill
              sizes="100vw"
              className="object-cover object-center"
              preload
            />
            <div className="absolute inset-0 bg-charcoal/72" />
          </div>
          <div className="relative mx-auto max-w-[40rem] px-5 py-20 text-center md:px-8 md:py-24 lg:py-28">
            <p className="text-[0.68rem] tracking-[0.3em] text-champagne uppercase">
              By appointment
            </p>
            <h1 className="mt-4 font-serif text-3xl text-ivory-soft md:text-5xl">
              Book a private hour
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-ivory-soft/75">
              Write with a preferred morning or afternoon. We confirm a still
              room — yours alone, with no waiting room of strangers.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-grid">
        <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-10 lg:py-24">
          <Reveal className="lg:col-span-5 lg:pt-4">
            <p className="text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
              The visit
            </p>
            <h2 className="mt-3 max-w-md font-serif text-3xl text-charcoal md:text-4xl">
              Arrive when it suits you.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted md:text-[0.95rem] md:leading-8">
              Appointments are private and unhurried. Evenings can be arranged.
              Telephone {CONTACT.phoneDisplay} if you would rather speak first.
            </p>
            <dl className="mt-8 max-w-sm space-y-3 border-t border-gold-line pt-6 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="text-muted">Place</dt>
                <dd className="text-charcoal">London, by appointment</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-muted">Duration</dt>
                <dd className="text-charcoal">A private hour</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-muted">Contact</dt>
                <dd className="text-charcoal">{CONTACT.phoneDisplay}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={80}>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
