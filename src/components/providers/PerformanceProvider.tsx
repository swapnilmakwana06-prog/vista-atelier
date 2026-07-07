"use client";

import { useEffect } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const { isMobile, preferLite } = usePerformanceMode();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.perf = preferLite ? "lite" : "full";
    root.dataset.mobile = isMobile ? "true" : "false";
    return () => {
      delete root.dataset.perf;
      delete root.dataset.mobile;
    };
  }, [isMobile, preferLite]);

  return children;
}