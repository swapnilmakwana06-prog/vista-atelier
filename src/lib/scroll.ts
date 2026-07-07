/** Cinematic ease — matches hero / page transition curves */
export function cinematicEaseOut(t: number): number {
  return 1 - Math.pow(1 - t, 3.8);
}

export const CINEMATIC_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const REVEAL_PERSPECTIVE = 1400;
export const COSMIC_SECTION_LERP = 0.11;

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export const NAV_SCROLL_OFFSET = -88;
export const CINEMATIC_ANCHOR_DURATION = 1.65;
export const MOBILE_ANCHOR_DURATION = 0.85;
export const CINEMATIC_WHEEL_LERP = 0.068;
export const CINEMATIC_TOUCH_LERP = 0.1;

export function nativeScrollTo(
  target: HTMLElement | string,
  offset = NAV_SCROLL_OFFSET,
  behavior: ScrollBehavior = "smooth"
) {
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export const cinematicScrollToOptions = {
  offset: NAV_SCROLL_OFFSET,
  duration: CINEMATIC_ANCHOR_DURATION,
  easing: cinematicEaseOut,
} as const;