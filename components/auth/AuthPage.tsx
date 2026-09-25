import Image from "next/image";
import { publicAsset } from "@/lib/assets";

type AuthPageProps = {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthPage({
  kicker,
  title,
  description,
  children,
}: AuthPageProps) {
  return (
    <main className="flex-1">
      <section className="editorial-grid">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[72rem] items-stretch md:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12">
          <div className="relative hidden overflow-hidden lg:col-span-5 lg:block">
            <Image
              src={publicAsset("/images/atelier-gold.jpg")}
              alt="Gold necklace and earrings presented on a white jeweller’s bust"
              fill
              sizes="42vw"
              className="object-cover object-center"
              preload
            />
            <div className="absolute inset-0 bg-charcoal/28" />
            <p className="absolute bottom-8 left-8 right-8 text-[0.68rem] tracking-[0.28em] text-ivory-soft/80 uppercase">
              Private client accounts
            </p>
          </div>

          <div className="px-5 py-14 pb-28 md:px-8 md:py-16 lg:col-span-7 lg:flex lg:items-center lg:px-14 lg:py-20 lg:pb-24">
            <div className="mx-auto w-full max-w-md">
              <p className="text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
                {kicker}
              </p>
              <h1 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl lg:text-[2.75rem]">
                {title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted md:text-[0.95rem] md:leading-8">
                {description}
              </p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
