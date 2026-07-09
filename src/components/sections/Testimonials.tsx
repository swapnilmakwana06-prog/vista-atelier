"use client";

import dynamic from "next/dynamic";
import { sectionCopy } from "@/lib/data";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsMobileTrack } from "@/components/sections/TestimonialsMobileTrack";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const TestimonialsDesktopCarousel = dynamic(
  () =>
    import("@/components/sections/TestimonialsDesktopCarousel").then(
      (m) => m.TestimonialsDesktopCarousel
    ),
  { ssr: false }
);

export function Testimonials() {
  const { preferLite, reduced } = usePerformanceMode();

  return (
    <CosmicSection
      id="testimonials"
      className="testimonials-section luxury-section portfolio-section section-padding-luxury overflow-hidden"
    >
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="luxury-section-rule" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-12 md:mb-16">
          <PortfolioHeader
            label={sectionCopy.testimonials.label}
            title={sectionCopy.testimonials.title}
            highlight={sectionCopy.testimonials.highlight}
            description={sectionCopy.testimonials.description}
            className="mx-auto max-w-3xl text-center"
          />
        </ScrollReveal>

        <div className="testimonials-stage">
          {preferLite ? (
            <TestimonialsMobileTrack />
          ) : (
            <TestimonialsDesktopCarousel reducedMotion={reduced} />
          )}
        </div>
      </div>
    </CosmicSection>
  );
}