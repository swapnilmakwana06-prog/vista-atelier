"use client";

import { HeroDesktopLayer } from "@/components/sections/HeroDesktopLayer";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/** Desktop-only hero video + parallax — skipped entirely on mobile */
export function HeroEnhancements() {
  const { preferLite } = usePerformanceMode();
  if (preferLite) return null;
  return <HeroDesktopLayer />;
}