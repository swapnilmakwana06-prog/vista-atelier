"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const EXIT_MS = 480;
const ENTER_MS = 880;

function isInternalRoute(href: string, currentPath: string) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http")
  ) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === currentPath && !url.hash) return false;
    return !url.hash || url.pathname !== currentPath;
  } catch {
    return false;
  }
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();
  const skipTransition = reduced || preferLite;
  const isFirstRender = useRef(true);
  const pendingNavigation = useRef(false);

  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [contentVisible, setContentVisible] = useState(true);

  const completeEnter = useCallback(() => {
    setPhase("enter");
    setContentVisible(true);
    window.setTimeout(() => {
      setPhase("idle");
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("vista:scroll-unlock"));
    }, ENTER_MS);
  }, []);

  useEffect(() => {
    if (skipTransition) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalRoute(href, pathname)) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.pathname === pathname && url.hash) return;
      } catch {
        return;
      }

      pendingNavigation.current = true;
      setPhase("exit");
      setContentVisible(false);
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("vista:scroll-lock"));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, skipTransition]);

  useEffect(() => {
    if (skipTransition) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo(0, 0);

    if (pendingNavigation.current) {
      pendingNavigation.current = false;
      window.setTimeout(() => completeEnter(), EXIT_MS);
      return;
    }

    setPhase("exit");
    setContentVisible(false);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("vista:scroll-lock"));

    const timer = window.setTimeout(() => completeEnter(), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, skipTransition, completeEnter]);

  if (skipTransition) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className={cn(
          "page-transition-curtain",
          (phase === "exit" || phase === "enter") && "page-transition-curtain-active",
          phase === "enter" && "page-transition-curtain-reveal"
        )}
        aria-hidden
      >
        <div className="page-transition-curtain-bg" />
        <div className="page-transition-curtain-glow" />
        <div className="page-transition-curtain-line" />
        <p className="page-transition-curtain-label font-heading">
          VISTA <span className="hero-gold-shimmer">Atelier</span>
        </p>
      </div>

      <div
        key={pathname}
        className={cn(
          "page-transition-content",
          !contentVisible && "page-transition-content-exit",
          contentVisible && phase === "enter" && "page-transition-content-enter",
          phase === "idle" && contentVisible && "page-transition-content-idle"
        )}
      >
        {children}
      </div>
    </>
  );
}