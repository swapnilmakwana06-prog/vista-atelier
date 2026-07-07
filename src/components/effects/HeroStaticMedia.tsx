import { heroPoster } from "@/lib/data";

/**
 * Zero-JS LCP hero — native img matches <link rel="preload"> exactly.
 * Avoids Next/Image proxy delay so the poster wins LCP over nav text.
 */
export function HeroStaticMedia() {
  return (
    <div className="hero-static-wrap absolute inset-0 overflow-hidden bg-[#04060f]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroPoster}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="hero-static-img crisp-image absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="hero-static-overlay pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-cinematic-vignette absolute inset-0" />
        <div className="hero-cinematic-scrim absolute inset-0" />
        <div className="hero-premium-scrim absolute inset-0" />
        <div className="hero-cinematic-bottom absolute inset-0" />
        <div className="hero-cinematic-gold-wash absolute inset-0 opacity-80" />
      </div>
    </div>
  );
}