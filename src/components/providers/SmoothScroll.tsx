"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  CINEMATIC_ANCHOR_DURATION,
  NAV_SCROLL_OFFSET,
  cinematicEaseOut,
  cinematicScrollToOptions,
  nativeScrollTo,
} from "@/lib/scroll";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LenisInstance = {
  destroy: () => void;
  stop: () => void;
  start: () => void;
  scrollTo: (
    target: HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    }
  ) => void;
  on: (event: string, callback: (instance: { progress: number }) => void) => void;
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();
  const useNativeScroll = preferLite || reduced;

  useEffect(() => {
    if (useNativeScroll) return;

    let lenis: LenisInstance | null = null;
    let cancelled = false;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.08,
        duration: 1.35,
        easing: cinematicEaseOut,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0.85,
        wheelMultiplier: 0.75,
        touchInertiaExponent: 1.65,
        stopInertiaOnNavigate: true,
        anchors: cinematicScrollToOptions,
      }) as LenisInstance;

      lenisRef.current = lenis;
      document.documentElement.classList.add("lenis", "lenis-smooth");

      lenis.on("scroll", (instance) => {
        const bar = progressRef.current;
        if (bar) {
          bar.style.transform = `scaleX(${instance.progress})`;
        }
      });

      const onScrollLock = () => lenis?.stop();
      const onScrollUnlock = () => {
        lenis?.start();
        scrollToHash(lenis!, window.location.hash, 120);
      };

      window.addEventListener("vista:scroll-lock", onScrollLock);
      window.addEventListener("vista:scroll-unlock", onScrollUnlock);

      return () => {
        window.removeEventListener("vista:scroll-lock", onScrollLock);
        window.removeEventListener("vista:scroll-unlock", onScrollUnlock);
      };
    };

    let removeListeners: (() => void) | undefined;

    init().then((cleanup) => {
      removeListeners = cleanup;
    });

    return () => {
      cancelled = true;
      removeListeners?.();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [useNativeScroll]);

  useEffect(() => {
    if (!useNativeScroll) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      nativeScrollTo(target, NAV_SCROLL_OFFSET, "smooth");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [useNativeScroll]);

  useEffect(() => {
    if (useNativeScroll) {
      if (window.location.hash) {
        const timer = window.setTimeout(() => {
          nativeScrollTo(window.location.hash, NAV_SCROLL_OFFSET, "smooth");
        }, 400);
        return () => window.clearTimeout(timer);
      }
      window.scrollTo(0, 0);
      return;
    }

    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });

    const hashTimer = window.setTimeout(() => {
      scrollToHash(lenis, window.location.hash, 0);
    }, 950);

    return () => window.clearTimeout(hashTimer);
  }, [pathname, useNativeScroll]);

  useEffect(() => {
    if (useNativeScroll || reduced) return;

    const onScroll = () => {
      const bar = progressRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [useNativeScroll, reduced]);

  return (
    <>
      {!reduced && !preferLite && (
        <div className="cinematic-scroll-progress" aria-hidden>
          <div ref={progressRef} className="cinematic-scroll-progress-bar" />
        </div>
      )}
      {children}
    </>
  );
}

function scrollToHash(lenis: LenisInstance, hash: string, delay: number) {
  if (!hash) return;

  window.setTimeout(() => {
    const el = document.querySelector(hash);
    if (!el) return;

    lenis.scrollTo(el as HTMLElement, {
      offset: NAV_SCROLL_OFFSET,
      duration: CINEMATIC_ANCHOR_DURATION,
      easing: cinematicEaseOut,
    });
  }, delay);
}