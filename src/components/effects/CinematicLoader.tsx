"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hasLoaderPlayed, markLoaderPlayed } from "@/lib/loader-session";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 2000;
const MIN_DURATION_DESKTOP = MIN_VISIBLE_MS;
const MIN_DURATION_MOBILE = MIN_VISIBLE_MS;
const MAX_DURATION_DESKTOP = 5200;
const MAX_DURATION_MOBILE = 2400;
const EXIT_DURATION_DESKTOP = 1200;
const EXIT_DURATION_MOBILE = 700;
const HOLD_AT_100_DESKTOP = 550;
const HOLD_AT_100_MOBILE = 400;

const STAR_COUNT_DESKTOP = 48;
const STAR_COUNT_MOBILE = 18;
const ORB_COUNT_DESKTOP = 10;
const ORB_COUNT_MOBILE = 4;

let loaderRunLock = false;

function dismissLoader(el: HTMLElement | null) {
  el?.remove();
  document.body.style.overflow = "";
  document.documentElement.removeAttribute("data-loading");
  window.dispatchEvent(new CustomEvent("vista:scroll-unlock"));
}

function updateSsrProgress(root: HTMLElement, pct: number) {
  const fill = root.querySelector<HTMLElement>(".luxury-loader-line-fill");
  const progressEl = root.querySelector<HTMLElement>(".luxury-loader-progress");
  fill?.classList.remove("luxury-loader-line-indeterminate");
  if (fill) fill.style.transform = `scaleX(${pct / 100})`;
  if (progressEl) {
    progressEl.innerHTML = `${Math.round(pct)}<span class="luxury-loader-progress-suffix">%</span>`;
  }
}

export function CinematicLoader() {
  const [visible, setVisible] = useState(() => !hasLoaderPlayed());
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();

  const starCount = preferLite ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
  const orbCount = preferLite ? ORB_COUNT_MOBILE : ORB_COUNT_DESKTOP;
  const minDuration = preferLite ? MIN_DURATION_MOBILE : MIN_DURATION_DESKTOP;
  const maxDuration = preferLite ? MAX_DURATION_MOBILE : MAX_DURATION_DESKTOP;
  const exitDuration = preferLite ? EXIT_DURATION_MOBILE : EXIT_DURATION_DESKTOP;
  const holdAt100 = preferLite ? HOLD_AT_100_MOBILE : HOLD_AT_100_DESKTOP;

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        top: (i * 23 + 7) % 100,
        size: (i % 3) + 1,
        delay: (i % 10) * 0.4,
        duration: 2.4 + (i % 5) * 0.6,
      })),
    [starCount]
  );

  const orbs = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        angle: (i / orbCount) * 360,
        radius: preferLite ? 90 + (i % 3) * 20 : 120 + (i % 3) * 28,
        size: 4 + (i % 4) * 3,
        delay: i * 0.55,
      })),
    [orbCount, preferLite]
  );

  useEffect(() => {
    if (!visible) {
      dismissLoader(document.getElementById("vista-initial-loader"));
      return;
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || reduced) return;

    const root = document.getElementById("vista-initial-loader");
    if (root) {
      root.classList.toggle("luxury-loader-lite", preferLite);
    }
  }, [visible, reduced, preferLite]);

  useEffect(() => {
    if (!visible) return;

    if (reduced || hasLoaderPlayed()) {
      markLoaderPlayed();
      setVisible(false);
      dismissLoader(document.getElementById("vista-initial-loader"));
      return;
    }

    if (loaderRunLock || startedRef.current) return;
    loaderRunLock = true;
    startedRef.current = true;

    document.documentElement.setAttribute("data-loading", "");
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("vista:scroll-lock"));

    const root = document.getElementById("vista-initial-loader");
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let raf = 0;
    let finished = false;
    let reached100At = 0;

    const beginExit = () => {
      if (finished) return;
      finished = true;
      markLoaderPlayed();
      setExiting(true);
      root?.classList.add("luxury-loader-exit");

      window.setTimeout(() => {
        setVisible(false);
        dismissLoader(root);
      }, exitDuration);
    };

    const onLoad = () => {
      loaded = true;
    };

    if (!loaded) {
      window.addEventListener("load", onLoad);
    }

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / minDuration, 1), 2.2);
      const readyToFinish = loaded && elapsed >= minDuration;
      const forceFinish = elapsed >= maxDuration;

      let nextProgress: number;
      if (readyToFinish || forceFinish) {
        nextProgress = 100;
      } else if (loaded) {
        nextProgress = Math.min(99, eased * 99);
      } else {
        nextProgress = Math.min(88, eased * 88);
      }

      setProgress(nextProgress);
      if (root) updateSsrProgress(root, nextProgress);

      if (nextProgress >= 100) {
        if (!reached100At) reached100At = now;
        if (readyToFinish || forceFinish) {
          if (now - reached100At >= holdAt100) {
            beginExit();
            return;
          }
        }
      } else {
        reached100At = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [
    visible,
    reduced,
    minDuration,
    maxDuration,
    exitDuration,
    holdAt100,
  ]);

  if (typeof window === "undefined") return null;
  if (!visible) return null;

  const ssrRoot = document.getElementById("vista-initial-loader");

  const extras =
    ssrRoot &&
    createPortal(
      <>
        <div className="luxury-loader-starfield" aria-hidden>
          {stars.map((star, i) => (
            <span
              key={i}
              className="luxury-loader-star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="luxury-loader-orbs" aria-hidden>
          {orbs.map((orb, i) => (
            <span
              key={i}
              className="luxury-loader-orb"
              style={{
                width: orb.size,
                height: orb.size,
                ["--orb-angle" as string]: `${orb.angle}deg`,
                ["--orb-radius" as string]: `${orb.radius}px`,
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="luxury-loader-curtain" aria-hidden />
      </>,
      ssrRoot
    );

  if (ssrRoot) return extras;

  return (
    <div
      className={cn(
        "luxury-loader",
        preferLite && "luxury-loader-lite",
        exiting && "luxury-loader-exit"
      )}
      aria-live="polite"
      aria-label="Loading VISTA Atelier"
    >
      <div className="luxury-loader-bg" />
      <div className="luxury-loader-nebula luxury-loader-nebula-a" />
      <div className="luxury-loader-nebula luxury-loader-nebula-b" />
      <div className="luxury-loader-vignette" />

      <div className="luxury-loader-starfield" aria-hidden>
        {stars.map((star, i) => (
          <span
            key={i}
            className="luxury-loader-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="luxury-loader-stage luxury-loader-stage-revealed">
        <div className="luxury-loader-orbs" aria-hidden>
          {orbs.map((orb, i) => (
            <span
              key={i}
              className="luxury-loader-orb"
              style={{
                width: orb.size,
                height: orb.size,
                ["--orb-angle" as string]: `${orb.angle}deg`,
                ["--orb-radius" as string]: `${orb.radius}px`,
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="luxury-loader-logo-wrap">
          <div className="luxury-loader-logo-glow" aria-hidden />
          <h1 className="luxury-loader-logo font-heading">
            <span className="luxury-loader-logo-vista">VISTA</span>{" "}
            <span className="luxury-loader-logo-atelier">Atelier</span>
          </h1>
        </div>

        <p className="luxury-loader-tagline luxury-loader-tagline-visible">
          Crafting Timeless Spaces
        </p>

        <div className="luxury-loader-line-wrap">
          <div className="luxury-loader-line-track">
            <div
              className="luxury-loader-line-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <p className="luxury-loader-progress" aria-hidden>
            {Math.round(progress)}
            <span className="luxury-loader-progress-suffix">%</span>
          </p>
        </div>
      </div>

      <div className="luxury-loader-curtain" aria-hidden />
    </div>
  );
}