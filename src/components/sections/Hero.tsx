import { HeroMobileStatic } from "@/components/effects/HeroMobileStatic";
import { HeroContent } from "@/components/sections/HeroContent";
import { HeroEnhancements } from "@/components/sections/HeroEnhancements";

/** Server-rendered hero — static image on mobile, cinematic video on desktop */
export function Hero() {
  return (
    <section
      className="hero-premium hero-ultra relative z-[1] flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="VISTA Atelier hero"
    >
      <div className="absolute inset-0 lg:hidden">
        <HeroMobileStatic />
      </div>

      <HeroEnhancements />
      <HeroContent />
    </section>
  );
}