"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  HeroDesktopMedia,
  HeroScrollEffects,
} from "@/components/sections/HeroClientLayer";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

export function HeroContentClient() {
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const { preferLite } = usePerformanceMode();

  const itemClass = preferLite
    ? "hero-mobile-fade-item"
    : "hero-lift-item hero-lift-item-lite";

  return (
    <>
      <HeroDesktopMedia />
      <HeroScrollEffects contentRef={contentRef} hintRef={hintRef} />

      <div
        ref={contentRef}
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-28 pb-24 sm:pt-32 sm:pb-28 lg:px-12",
          preferLite ? "hero-content-mobile" : "gpu-layer"
        )}
      >
        <div className="max-w-4xl">
          <p
            className={cn("hero-premium-label mb-5 sm:mb-6", itemClass)}
            style={preferLite ? undefined : { animationDelay: "0.15s" }}
          >
            Interior Design Studio
          </p>

          <h1
            className={cn(
              "hero-premium-headline text-balance",
              itemClass,
              preferLite && "hero-mobile-fade-item-delay-1"
            )}
            style={preferLite ? undefined : { animationDelay: "0.3s" }}
          >
            Crafting Timeless Spaces That{" "}
            <span
              className={cn(
                preferLite ? "text-gold" : "hero-gold-shimmer"
              )}
            >
              Whisper Luxury
            </span>
          </h1>

          <p
            className={cn(
              "hero-premium-sub mt-6 max-w-2xl sm:mt-8",
              itemClass,
              preferLite && "hero-mobile-fade-item-delay-2"
            )}
            style={preferLite ? undefined : { animationDelay: "0.45s" }}
          >
            Where architecture meets emotion — bespoke interiors shaped with
            obsessive detail, architectural precision, and the quiet confidence
            of true luxury.
          </p>

          <div
            className={cn(
              "mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5",
              itemClass,
              preferLite && "hero-mobile-fade-item-delay-3"
            )}
            style={preferLite ? undefined : { animationDelay: "0.6s" }}
          >
            <Button
              href="#projects"
              variant="gold"
              className="hero-btn-gold-glow touch-target w-full px-8 py-4 sm:w-auto sm:px-10 sm:py-5"
            >
              Explore Our Work
            </Button>
            <Button
              href="#contact"
              variant="outline"
              className="hero-btn-outline-premium touch-target w-full px-8 py-4 sm:w-auto sm:px-10 sm:py-5"
            >
              Book Private Consultation
            </Button>
          </div>
        </div>
      </div>

      {!preferLite && (
        <div
          ref={hintRef}
          className="gpu-layer absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10"
        >
          <span className="hero-scroll-hint text-[10px] tracking-[0.35em] text-cyan/70 uppercase">
            Discover
          </span>
          <div className="hero-scroll-line h-12 w-px" />
        </div>
      )}
    </>
  );
}