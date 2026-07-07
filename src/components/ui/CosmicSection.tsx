"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import {
  COSMIC_SECTION_LERP,
  REVEAL_PERSPECTIVE,
  lerp,
} from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface CosmicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SETTLE_EPSILON = 0.08;

export function CosmicSection({ children, className, id }: CosmicSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { preferLite, reduced } = usePerformanceMode();

  useEffect(() => {
    if (reduced || preferLite) return;
    const section = ref.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    let rafId = 0;
    let animating = false;

    const state = {
      rotateX: 0,
      translateZ: 0,
      translateY: 0,
      scale: 1,
      opacity: 1,
    };

    const targets = { ...state };

    const applyTransform = () => {
      inner.style.transform = `perspective(${REVEAL_PERSPECTIVE}px) rotateX(${state.rotateX}deg) translateZ(${state.translateZ}px) translateY(${state.translateY}px) scale(${state.scale})`;
      inner.style.opacity = String(state.opacity);
    };

    const updateTargets = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      const focus = 1 - Math.abs(clamped);

      targets.rotateX = clamped * -4.2;
      targets.translateZ = Math.abs(clamped) * 20;
      targets.translateY = -focus * 5.5;
      targets.scale = 1 - Math.abs(clamped) * 0.018;
      targets.opacity = 0.8 + focus * 0.2;
    };

    const tick = () => {
      updateTargets();

      state.rotateX = lerp(state.rotateX, targets.rotateX, COSMIC_SECTION_LERP);
      state.translateZ = lerp(
        state.translateZ,
        targets.translateZ,
        COSMIC_SECTION_LERP
      );
      state.translateY = lerp(
        state.translateY,
        targets.translateY,
        COSMIC_SECTION_LERP
      );
      state.scale = lerp(state.scale, targets.scale, COSMIC_SECTION_LERP);
      state.opacity = lerp(state.opacity, targets.opacity, COSMIC_SECTION_LERP);

      applyTransform();

      const settled =
        Math.abs(state.rotateX - targets.rotateX) < SETTLE_EPSILON &&
        Math.abs(state.translateZ - targets.translateZ) < SETTLE_EPSILON &&
        Math.abs(state.translateY - targets.translateY) < SETTLE_EPSILON &&
        Math.abs(state.scale - targets.scale) < 0.002 &&
        Math.abs(state.opacity - targets.opacity) < 0.01;

      if (!settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        animating = false;
      }
    };

    const onScroll = () => {
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduced, preferLite]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("cosmic-section relative z-[1] scroll-anchor", className)}
    >
      <div ref={innerRef} className="cosmic-section-inner gpu-layer">
        {children}
      </div>
    </section>
  );
}