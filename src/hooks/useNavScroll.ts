"use client";

import { useEffect, useState } from "react";

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    document.documentElement.dataset.mobile === "true"
  );
}

/** Updates only when scroll thresholds cross — avoids re-renders every frame */
export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mobile = isMobileViewport();
    let lastY = 0;
    let ticking = false;
    let isScrolled = false;
    let isHidden = false;

    const update = () => {
      const y = window.scrollY;
      const nextScrolled = y > 80;
      const nextHidden = !mobile && y > 400 && y > lastY;

      if (nextScrolled !== isScrolled) {
        isScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (nextHidden !== isHidden) {
        isHidden = nextHidden;
        setHidden(nextHidden);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, hidden };
}