"use client";

import { useEffect, useMemo, useState } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const MIN_DURATION_DESKTOP = 2600;
const MIN_DURATION_MOBILE = 1400;
const MAX_DURATION_DESKTOP = 5200;
const MAX_DURATION_MOBILE = 2400;
const EXIT_DURATION_DESKTOP = 1200;
const EXIT_DURATION_MOBILE = 700;

const STAR_COUNT_DESKTOP = 48;
const STAR_COUNT_MOBILE = 18;
const ORB_COUNT_DESKTOP = 10;
const ORB_COUNT_MOBILE = 4;

export function CinematicLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();

  const starCount = preferLite ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
  const orbCount = preferLite ? ORB_COUNT_MOBILE : ORB_COUNT_DESKTOP;
  const minDuration = preferLite ? MIN_DURATION_MOBILE : MIN_DURATION_DESKTOP;
  const maxDuration = preferLite ? MAX_DURATION_MOBILE : MAX_DURATION_DESKTOP;
  const exitDuration = preferLite ? EXIT_DURATION_MOBILE : EXIT_DURATION_DESKTOP;

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
    const ssr = document.getElementById("vista-initial-loader");
    if (ssr) {
      requestAnimationFrame(() => ssr.remove());
    }
  }, []);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-loading");
      document.getElementById("vista-initial-loader")?.remove();
      window.dispatchEvent(new CustomEvent("vista:scroll-unlock"));
      return;
    }

    document.documentElement.setAttribute("data-loading", "");
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("vista:scroll-lock"));

    const start = performance.now();
    let loaded = document.readyState === "complete";
    let raf = 0;
    let finished = false;

    const complete = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setExiting(true);
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        document.documentElement.removeAttribute("data-loading");
        window.dispatchEvent(new CustomEvent("vista:scroll-unlock"));
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
      const target = loaded ? 100 : 88;
      setProgress(
        Math.min(eased * target, loaded && elapsed >= minDuration ? 100 : 98)
      );

      if (loaded && elapsed >= minDuration) {
        complete();
        return;
      }

      if (elapsed >= maxDuration) {
        complete();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, [reduced, minDuration, maxDuration, exitDuration]);

  if (!visible) return null;

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

      <div
        className={cn(
          "luxury-loader-stage",
          revealed && "luxury-loader-stage-revealed"
        )}
      >
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

        <p className="luxury-loader-tagline">Crafting Timeless Spaces</p>

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