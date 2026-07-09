import Image from "next/image";
import { heroPoster } from "@/lib/data";
import { IMAGE_QUALITY } from "@/lib/image";

/** Server-rendered mobile hero — sharp static image, luxury overlays, zero client JS */
export function HeroMobileStatic() {
  return (
    <div className="hero-mobile-wrap absolute inset-0 overflow-hidden bg-background">
      <Image
        src={heroPoster}
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={IMAGE_QUALITY.heroLite}
        sizes="(max-width: 430px) 100vw, (max-width: 768px) 100vw, 100vw"
        className="hero-static-img object-cover object-[center_22%]"
        aria-hidden
      />

      <div
        className="hero-mobile-overlay pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="hero-mobile-rays" />
        <div className="hero-mobile-vignette" />
        <div className="hero-mobile-dark-scrim" />
        <div className="hero-mobile-gold-wash" />
        <div className="hero-cinematic-bottom absolute inset-0 opacity-95" />
      </div>
    </div>
  );
}