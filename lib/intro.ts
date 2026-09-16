export const INTRO_STORAGE_KEY = "azizi-brand-intro";
export const INTRO_WORDS = ["AZIZI", "JEWELLERY"] as const;

export const INTRO_CHAR_STAGGER_MS = 72;
export const INTRO_CHAR_ANIM_MS = 550;
export const INTRO_HOLD_MS = 350;
export const INTRO_SCALE_MS = 780;
export const INTRO_EXIT_MS = 920;
export const INTRO_REDUCED_HOLD_MS = 900;
export const INTRO_REDUCED_EXIT_MS = 420;
export const INTRO_FALLBACK_BUFFER_MS = 700;

export function introCharDelayMs(wordIndex: number, letterIndex: number) {
  let delay = 0;
  for (let i = 0; i < wordIndex; i += 1) {
    delay += INTRO_WORDS[i].length * INTRO_CHAR_STAGGER_MS;
  }
  return delay + letterIndex * INTRO_CHAR_STAGGER_MS;
}

export function introTypeDurationMs() {
  const lastWord = INTRO_WORDS.length - 1;
  const lastLetter = INTRO_WORDS[lastWord].length - 1;
  return introCharDelayMs(lastWord, lastLetter) + INTRO_CHAR_ANIM_MS;
}

export function introTotalDurationMs() {
  return introTypeDurationMs() + INTRO_HOLD_MS + INTRO_SCALE_MS + INTRO_EXIT_MS;
}

export function introReducedTotalDurationMs() {
  return INTRO_REDUCED_HOLD_MS + INTRO_REDUCED_EXIT_MS;
}
