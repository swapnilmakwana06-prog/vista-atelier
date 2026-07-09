import Image from "next/image";
import { heroPoster } from "@/lib/data";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";

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
        quality={IMAGE_QUALITY.hero}
        sizes={IMAGE_SIZES.hero}
        className="hero-static-img crisp-image object-cover object-[center_22%]"
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