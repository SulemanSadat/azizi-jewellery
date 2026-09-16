export const GOLD_KARATS = [9, 14, 18, 22, 24] as const;

/** A deliberately generous, but finite, calculator limit. */
export const MAX_WEIGHT_GRAMS = 1_000_000;

export type GoldKarat = (typeof GOLD_KARATS)[number];

export type GoldPurity = {
  karat: GoldKarat;
  label: string;
  /** Hallmark fineness as a fraction of fine gold (UK convention). */
  fineness: number;
};

export const GOLD_PURITIES: readonly GoldPurity[] = [
  { karat: 9, label: "9K", fineness: 0.375 },
  { karat: 14, label: "14K", fineness: 0.585 },
  { karat: 18, label: "18K", fineness: 0.75 },
  { karat: 22, label: "22K", fineness: 0.916 },
  { karat: 24, label: "24K", fineness: 0.999 },
];

export type GoldPriceSource = "indicative" | "live";

/**
 * Quote for 1 gram of fine (24K) gold.
 * Swap `source` to `"live"` and populate `pricePerGramFine` from an API later.
 */
export type GoldPriceQuote = {
  currency: "GBP";
  pricePerGramFine: number;
  source: GoldPriceSource;
  asOfLabel: string;
};

/** Placeholder reference only — replace inside `getGoldQuote` when a live feed is wired. */
export const INDICATIVE_GOLD_QUOTE: GoldPriceQuote = {
  currency: "GBP",
  pricePerGramFine: 78.4,
  source: "indicative",
  asOfLabel: "Indicative reference",
};

/** Single entry point for the calculator. Later: fetch a live quote and return `source: "live"`. */
export function getGoldQuote(): GoldPriceQuote {
  return INDICATIVE_GOLD_QUOTE;
}

export type GoldValuation = {
  karat: GoldKarat;
  label: string;
  fineness: number;
  weightGrams: number;
  fineGoldGrams: number;
  estimatedValue: number;
  quote: GoldPriceQuote;
};

export function getPurity(karat: GoldKarat): GoldPurity {
  const purity = GOLD_PURITIES.find((item) => item.karat === karat);
  if (!purity) {
    throw new Error(`Unsupported karat: ${karat}`);
  }
  return purity;
}

export function calculateGoldValue(
  weightGrams: number,
  karat: GoldKarat,
  quote: GoldPriceQuote = INDICATIVE_GOLD_QUOTE,
): GoldValuation | null {
  if (
    !Number.isFinite(weightGrams) ||
    weightGrams <= 0 ||
    weightGrams > MAX_WEIGHT_GRAMS
  ) {
    return null;
  }

  const purity = getPurity(karat);
  const fineGoldGrams = weightGrams * purity.fineness;

  return {
    karat,
    label: purity.label,
    fineness: purity.fineness,
    weightGrams,
    fineGoldGrams,
    estimatedValue: fineGoldGrams * quote.pricePerGramFine,
    quote,
  };
}

export function formatGbp(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatGrams(value: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return `${value.toLocaleString("en-GB", {
    maximumFractionDigits: value < 10 ? 3 : 2,
  })} g`;
}
