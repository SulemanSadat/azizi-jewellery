"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  INTRO_EXIT_MS,
  INTRO_HOLD_MS,
  INTRO_REDUCED_EXIT_MS,
  INTRO_REDUCED_HOLD_MS,
  INTRO_SCALE_MS,
  INTRO_STORAGE_KEY,
  INTRO_WORDS,
  introCharDelayMs,
  introTypeDurationMs,
} from "@/lib/intro";

type Phase = "type" | "scale" | "exit";

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function alreadySeen() {
  if (document.documentElement.dataset.intro === "done") return true;
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function fitWordmark(node: HTMLElement) {
  const parent = node.parentElement;
  if (!parent) return;

  node.style.setProperty("--intro-fit", "1");
  const available = parent.clientWidth;
  const needed = Math.max(node.scrollWidth, node.getBoundingClientRect().width);
  if (available <= 0 || needed <= 0) return;

  const roomForScale = 1.08;
  node.style.setProperty("--intro-fit", String(Math.min(1, available / (needed * roomForScale))));
}

export default function BrandIntro() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(isHome);
  const [phase, setPhase] = useState<Phase>("type");
  const timers = useRef<number[]>([]);
  const finishing = useRef(false);
  const finished = useRef(false);
  const fitRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* private mode */
    }
    document.documentElement.dataset.intro = "done";
    document.documentElement.classList.remove("intro-lock");
    setVisible(false);
  }, []);

  const complete = useCallback(
    (reduced: boolean) => {
      if (finishing.current) return;
      finishing.current = true;
      clearTimers();
      setPhase("exit");
      const exitTimer = window.setTimeout(
        () => {
          finish();
        },
        reduced ? INTRO_REDUCED_EXIT_MS : INTRO_EXIT_MS,
      );
      timers.current.push(exitTimer);
    },
    [clearTimers, finish],
  );

  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    if (!isHome) {
      document.documentElement.classList.remove("intro-lock");
      setVisible(false);
      return;
    }

    if (alreadySeen()) {
      document.documentElement.dataset.intro = "done";
      document.documentElement.classList.remove("intro-lock");
      setVisible(false);
      return;
    }

    finishing.current = false;
    finished.current = false;
    setPhase("type");
    setVisible(true);
    document.documentElement.classList.add("intro-lock");

    const reduced = prefersReducedMotion();
    const typeMs = reduced ? 0 : introTypeDurationMs();
    let cancelled = false;
    const fitNode = fitRef.current;
    const fit = () => {
      if (cancelled || !fitRef.current) return;
      fitWordmark(fitRef.current);
    };

    const scaleTimer = window.setTimeout(() => {
      if (!reduced) {
        setPhase("scale");
      }
    }, typeMs + INTRO_HOLD_MS);

    const exitTimer = window.setTimeout(
      () => {
        complete(reduced);
      },
      reduced ? INTRO_REDUCED_HOLD_MS : typeMs + INTRO_HOLD_MS + INTRO_SCALE_MS,
    );
    timers.current.push(scaleTimer, exitTimer);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") complete(true);
    };

    window.addEventListener("keydown", onKey);

    // These only improve the wordmark fit. They are deliberately isolated
    // from the Intro lifecycle so an unsupported mobile browser API cannot
    // leave the fixed overlay and scroll lock in place.
    let observer: ResizeObserver | null = null;
    try {
      fit();
      const fontReady = document.fonts?.ready;
      if (fontReady && typeof fontReady.then === "function") {
        void fontReady.then(fit, () => undefined);
      }
      if (fitNode && typeof ResizeObserver === "function") {
        observer = new ResizeObserver(fit);
        observer.observe(fitNode);
      }
      window.addEventListener("resize", fit);
    } catch {
      // The animation and completion path remain active without fit helpers.
    }

    return () => {
      cancelled = true;
      clearTimers();
      observer?.disconnect();
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [clearTimers, complete, isHome]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!visible) return null;

  return (
    <div
      className={`brand-intro brand-intro--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="AZIZI JEWELLERY"
    >
      <div className="brand-intro__veil" aria-hidden="true" />
      <div className="brand-intro__stage">
        <div className="brand-intro__mark">
          <div className="brand-intro__fit" ref={fitRef}>
            {INTRO_WORDS.map((word, wordIndex) => (
              <p key={word} className="brand-intro__word">
                {Array.from(word).map((letter, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="brand-intro__char"
                    style={{ animationDelay: `${introCharDelayMs(wordIndex, index)}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
}
