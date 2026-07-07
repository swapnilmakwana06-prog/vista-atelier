"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function getDefaultRootMargin(): string {
  if (typeof document === "undefined") return "280px 0px";
  return document.documentElement.dataset.perf === "lite"
    ? "0px 0px"
    : "280px 0px";
}

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  /** Viewport margin before mounting — e.g. "200px" preloads slightly ahead */
  rootMargin?: string;
  minHeight?: string;
}

export function LazySection({
  children,
  className,
  rootMargin,
  minHeight = "min-h-[50vh]",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const margin = rootMargin ?? getDefaultRootMargin();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <div
      ref={ref}
      className={className ?? `${minHeight} below-fold`}
      style={{ contentVisibility: visible ? "visible" : "auto" }}
    >
      {visible ? children : null}
    </div>
  );
}