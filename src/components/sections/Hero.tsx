import { HeroMobileStatic } from "@/components/effects/HeroMobileStatic";
import { HeroContentClient } from "@/components/sections/HeroContentClient";

/** Server-rendered hero shell — static mobile image + desktop cinematic layers */
export function Hero() {
  return (
    <section className="hero-premium relative z-[1] flex min-h-[100dvh] items-center overflow-hidden">
      <div className="absolute inset-0 lg:hidden">
        <HeroMobileStatic />
      </div>

      <HeroContentClient />
    </section>
  );
}