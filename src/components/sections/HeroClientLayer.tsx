"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CinematicHeroMedia = dynamic(
  () =>
    import("@/components/effects/CinematicHeroMedia").then(
      (m) => m.CinematicHeroMedia
    ),
  { ssr: false }
);

interface HeroClientLayerProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  hintRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroDesktopMedia() {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return null;
  return (
    <div className="absolute inset-0 hidden lg:block">
      <CinematicHeroMedia />
    </div>
  );
}

export function HeroScrollEffects({ contentRef, hintRef }: HeroClientLayerProps) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const content = contentRef.current;
    const hint = hintRef.current;
    if (!content) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.min(
          Math.max(window.scrollY / window.innerHeight, 0),
          1
        );
        const opacity = Math.max(1 - progress * 2.4, 0);
        const lift = progress * 64;
        const depth = progress * 48;
        content.style.opacity = String(opacity);
        content.style.transform = `perspective(1400px) translate3d(0, ${-lift}px, ${depth}px) scale(${1 - progress * 0.07}) rotateX(${progress * 5}deg)`;
        if (hint) hint.style.opacity = String(Math.max(1 - progress * 5, 0));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced, isDesktop, contentRef, hintRef]);

  return null;
}