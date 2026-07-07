"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function detectLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (
    navigator as Navigator & { deviceMemory?: number }
  ).deviceMemory;
  return cores <= 4 || (memory !== undefined && memory <= 4);
}

function getInitialLite(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.perf === "lite";
}

export function usePerformanceMode() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTouch = useMediaQuery("(pointer: coarse)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const reduced = useReducedMotion();
  const [saveData, setSaveData] = useState(false);
  const [lowEnd, setLowEnd] = useState(false);
  const [bootLite] = useState(getInitialLite);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;
    setSaveData(connection?.saveData ?? false);
    setLowEnd(detectLowEndDevice());
  }, []);

  const preferLite =
    bootLite ||
    isMobile ||
    (isTouch && isTablet) ||
    reduced ||
    saveData ||
    lowEnd;

  return {
    isMobile,
    isTouch,
    isTablet,
    reduced,
    saveData,
    lowEnd,
    preferLite,
  };
}