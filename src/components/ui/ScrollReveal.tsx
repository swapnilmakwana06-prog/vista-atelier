"use client";

import { useEffect, useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type ScrollRevealVariant =
  | "fadeUp"
  | "scale"
  | "fade"
  | "cinematic"
  | "lift"
  | "subtle";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  delay?: number;
  /** Intersection ratio (0–1) before reveal triggers */
  amount?: number;
  /** Gold accent line on cinematic headers */
  accent?: boolean;
}

const variantClass: Record<ScrollRevealVariant, string> = {
  fadeUp: "reveal-fade-up",
  scale: "reveal-scale",
  fade: "reveal-fade",
  cinematic: "reveal-cinematic",
  lift: "reveal-lift",
  subtle: "reveal-subtle",
};

const CINEMATIC_VARIANTS = new Set<ScrollRevealVariant>([
  "cinematic",
  "lift",
  "scale",
]);

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  amount = 0.12,
  accent = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();

  useEffect(() => {
    if (reduced || preferLite) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-active");
          observer.disconnect();
        }
      },
      {
        threshold: amount,
        rootMargin: "-4% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, preferLite, amount]);

  if (reduced || preferLite) {
    return (
      <div className={cn("reveal-lite-instant", className)}>{children}</div>
    );
  }

  const activeVariant = variant;

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-base gpu-layer",
        CINEMATIC_VARIANTS.has(activeVariant) && "reveal-perspective",
        variantClass[activeVariant],
        accent && variant === "cinematic" && "reveal-cinematic-accent",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}

export function RevealStagger({
  children,
  className,
  amount = 0.1,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();

  useEffect(() => {
    if (reduced || preferLite) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-stagger-active");
          observer.disconnect();
        }
      },
      {
        threshold: amount,
        rootMargin: "-4% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, preferLite, amount]);

  if (reduced || preferLite) {
    return (
      <div className={cn("reveal-stagger-lite-instant", className)}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("reveal-stagger", className)}>
      {children}
    </div>
  );
}

/** @deprecated Use RevealStagger children with reveal-stagger-item class */
export const staggerChildVariants = {};
export const staggerChildScaleVariants = {};