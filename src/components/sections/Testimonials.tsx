"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/lib/data";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { preferLite } = usePerformanceMode();
  const plugins = useMemo(
    () =>
      preferLite
        ? []
        : [Autoplay({ delay: 6500, stopOnInteraction: true })],
    [preferLite]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    preferLite
      ? { loop: false, align: "start", containScroll: "trimSnaps", dragFree: false }
      : { loop: true, align: "center", dragFree: false },
    plugins
  );
  const [active, setActive] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <CosmicSection className="testimonials-section portfolio-section section-padding overflow-hidden">
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <PortfolioHeader
            label="Client Testimonials"
            title="Voices of"
            highlight="Distinction"
            description="The trust of discerning clients across Manhattan, Paris, London, and beyond — each space a testament to quiet luxury."
            className="mx-auto max-w-3xl text-center"
          />
        </ScrollReveal>

        <div ref={emblaRef} className="testimonials-carousel overflow-hidden">
          <div className="flex">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="min-w-0 shrink-0 grow-0 basis-full px-4 md:basis-[85%] md:px-8 lg:basis-[75%]"
              >
                <div
                  className={cn(
                    "testimonial-card mx-auto max-w-4xl transition-opacity duration-500 ease-out",
                    preferLite
                      ? "opacity-100"
                      : cn(
                          "transition-all duration-700 ease-out",
                          i === active
                            ? "testimonial-card-active scale-100 opacity-100"
                            : "scale-[0.96] opacity-30"
                        )
                  )}
                >
                  <div className="testimonial-card-inner">
                    <span className="testimonial-quote-mark" aria-hidden>
                      &ldquo;
                    </span>
                    <div className="testimonial-card-line mb-8 h-px w-14 bg-gradient-to-r from-cyan via-gold to-transparent" />

                    <blockquote className="testimonial-quote">
                      {t.quote}
                    </blockquote>

                    <footer className="testimonial-author mt-10">
                      <p className="testimonial-author-name">{t.author}</p>
                      <p className="testimonial-author-meta">
                        {t.role} · {t.location}
                      </p>
                      <div
                        className="testimonial-author-accent mt-4 h-px w-10"
                        aria-hidden
                      />
                    </footer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "touch-target h-2.5 w-2.5 rounded-full transition-colors duration-300",
                i === active
                  ? "bg-gold"
                  : "bg-border-subtle hover:bg-gold/40 active:bg-gold/60"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}