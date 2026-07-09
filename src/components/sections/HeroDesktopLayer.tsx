"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CinematicHeroMedia = dynamic(
  () =>
    import("@/components/effects/CinematicHeroMedia").then(
      (m) => m.CinematicHeroMedia
    ),
  { ssr: false }
);

/** Desktop-only hero video — scroll fade uses translateY only (no 3D blur). */
export function HeroDesktopLayer() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !isDesktop) return;

    const content = document.getElementById("hero-content");
    const hint = document.getElementById("hero-scroll-hint");
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
        const lift = progress * 48;
        content.style.opacity = String(opacity);
        content.style.transform = `translate3d(0, ${-lift}px, 0)`;
        if (hint) hint.style.opacity = String(Math.max(1 - progress * 5, 0));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      content.style.opacity = "";
      content.style.transform = "";
    };
  }, [reduced, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0 hidden lg:block">
      <CinematicHeroMedia />
    </div>
  );
}