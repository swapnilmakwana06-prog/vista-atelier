"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 12) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (Math.abs(currentY - lastY) >= threshold) {
        setDirection(currentY > lastY ? "down" : "up");
        lastY = currentY;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrollY };
}