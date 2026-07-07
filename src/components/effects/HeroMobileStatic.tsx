import Image from "next/image";
import { heroPoster } from "@/lib/data";
import { IMAGE_QUALITY } from "@/lib/image";

/** Server-rendered mobile hero — static image only, zero client JS */
export function HeroMobileStatic() {
  return (
    <div className="hero-mobile-wrap absolute inset-0 overflow-hidden bg-[#04060f]">
      <Image
        src={heroPoster}
        alt=""
        fill
        priority
        quality={IMAGE_QUALITY.heroLite}
        sizes="100vw"
        className="hero-static-img object-cover"
        aria-hidden
      />
      <div
        className="hero-mobile-overlay pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="hero-mobile-dark-scrim absolute inset-0" />
        <div className="hero-cinematic-bottom absolute inset-0 opacity-90" />
      </div>
    </div>
  );
}