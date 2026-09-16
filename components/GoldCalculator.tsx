"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import {
  calculateGoldValue,
  formatGbp,
  formatGrams,
  getGoldQuote,
  GOLD_PURITIES,
  MAX_WEIGHT_GRAMS,
  type GoldKarat,
} from "@/lib/gold";

const MAX_WEIGHT_DECIMALS = 3;
const WEIGHT_INPUT_PATTERN = new RegExp(
  `^\\d{0,7}(?:\\.\\d{0,${MAX_WEIGHT_DECIMALS}})?$`,
);

function parseWeight(value: string): number {
  const next = Number.parseFloat(value);
  return Number.isFinite(next) ? next : NaN;
}

function formatWeightInput(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    useGrouping: false,
    maximumFractionDigits: MAX_WEIGHT_DECIMALS,
  }).format(value);
}

export default function GoldCalculator() {
  const [karat, setKarat] = useState<GoldKarat>(18);
  const [weight, setWeight] = useState("12.5");

  const parsedWeight = useMemo(() => {
    return parseWeight(weight);
  }, [weight]);

  const quote = getGoldQuote();
  const valuation = useMemo(
    () => calculateGoldValue(parsedWeight, karat, quote),
    [parsedWeight, karat, quote],
  );

  const selected = GOLD_PURITIES.find((item) => item.karat === karat)!;

  const updateWeight = (next: string) => {
    const normalized = next.replace(",", ".");

    if (WEIGHT_INPUT_PATTERN.test(normalized)) {
      setWeight(normalized);
    }
  };

  const normaliseWeight = () => {
    if (!Number.isFinite(parsedWeight)) {
      return;
    }

    setWeight(formatWeightInput(Math.min(parsedWeight, MAX_WEIGHT_GRAMS)));
  };

  return (
    <section
      id="calculator"
      className="editorial-grid scroll-mt-16 border-t border-gold-line/70 md:scroll-mt-20"
    >
      <div className="mx-auto grid max-w-[72rem] gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-12 lg:items-start lg:gap-12 lg:px-10 lg:py-24">
        <Reveal className="lg:col-span-5 lg:pt-4">
          <p className="text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
            Gold calculator
          </p>
          <h2 className="mt-3 max-w-md font-serif text-3xl text-charcoal md:text-4xl lg:text-[2.7rem] lg:leading-tight">
            A first reading of what you hold.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted md:text-[0.95rem] md:leading-8">
            Choose the hallmark and enter the weight. The figure is an
            indicative melt estimate against a reference gold price — useful
            before a private weighing, never a substitute for one.
          </p>
          <dl className="mt-8 max-w-sm space-y-3 border-t border-gold-line pt-6 text-sm">
            <div className="flex min-w-0 justify-between gap-6">
              <dt className="text-muted">Purity</dt>
              <dd className="min-w-0 text-right text-charcoal">
                {selected.label} · {(selected.fineness * 1000).toFixed(0)}
              </dd>
            </div>
            <div className="flex min-w-0 justify-between gap-6">
              <dt className="text-muted">Reference</dt>
              <dd className="min-w-0 text-right text-charcoal">{quote.asOfLabel}</dd>
            </div>
            <div className="flex min-w-0 justify-between gap-6">
              <dt className="text-muted">Fine gold</dt>
              <dd className="min-w-0 text-right text-charcoal">
                {formatGbp(quote.pricePerGramFine)} / g
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={80}>
          <form
            className="glass-panel calculator-lift box-border min-w-0 overflow-hidden px-5 py-6 md:px-8 md:py-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset>
              <legend className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
                Gold purity
              </legend>
              <div
                className="mt-3 grid grid-cols-5 gap-1.5"
                role="radiogroup"
                aria-label="Gold purity"
              >
                {GOLD_PURITIES.map((item) => {
                  const active = item.karat === karat;
                  return (
                    <button
                      key={item.karat}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setKarat(item.karat)}
                      className={`min-h-12 border text-[0.78rem] tracking-[0.08em] transition-colors md:text-[0.82rem] ${
                        active
                          ? "border-charcoal bg-charcoal text-ivory-soft"
                          : "border-gold-line bg-ivory-soft/50 text-ink hover:border-champagne-dark"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="mt-7 block">
              <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
                Weight
              </span>
              <span className="relative mt-3 flex min-h-14 min-w-0 box-border items-center overflow-hidden border border-gold-line bg-ivory-soft/70 focus-within:border-champagne-dark">
                <input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  name="weight"
                  value={weight}
                  onChange={(event) => updateWeight(event.target.value)}
                  onBlur={normaliseWeight}
                  maxLength={11}
                  aria-describedby="weight-hint"
                  className="h-14 min-w-0 w-full box-border bg-transparent px-4 font-serif text-3xl tabular-nums text-charcoal outline-none md:text-[2rem]"
                />
                <span className="shrink-0 pr-4 text-[0.7rem] tracking-[0.2em] text-muted uppercase">
                  grams
                </span>
              </span>
            </label>
            <p id="weight-hint" className="mt-2 text-xs leading-5 text-muted">
              Use the scale reading, or a close estimate in grams. Up to 1,000,000 g and three decimal places.
            </p>

            <div className="mt-8 min-w-0 overflow-hidden border-t border-gold-line pt-6" aria-live="polite">
              <p className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
                Estimated value
              </p>
              {valuation ? (
                <>
                  <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap font-serif text-[clamp(2.25rem,8vw,3.75rem)] leading-none tabular-nums text-charcoal">
                    {formatGbp(valuation.estimatedValue)}
                  </p>
                  <p className="mt-4 break-words text-sm leading-6 text-muted">
                    {formatGrams(valuation.weightGrams)} of {valuation.label}{" "}
                    contains {formatGrams(valuation.fineGoldGrams)} of fine gold.
                  </p>
                </>
              ) : (
                <p className="mt-3 font-serif text-2xl text-ink">
                  Enter a weight to see an estimate.
                </p>
              )}
            </div>

            <p className="mt-6 text-[0.72rem] leading-6 text-muted">
              Figures are guidance only. Stones, plating, and unhallmarked
              pieces are assessed in person. The offer we make is the one we
              weigh together.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
