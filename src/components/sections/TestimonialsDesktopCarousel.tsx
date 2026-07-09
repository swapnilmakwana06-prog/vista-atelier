"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { cn } from "@/lib/utils";

interface TestimonialsDesktopCarouselProps {
  reducedMotion?: boolean;
}

export function TestimonialsDesktopCarousel({
  reducedMotion = false,
}: TestimonialsDesktopCarouselProps) {
  const plugins = useMemo(
    () =>
      reducedMotion
        ? []
        : [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })],
    [reducedMotion]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      duration: 18,
      skipSnaps: false,
      watchDrag: true,
    },
    plugins
  );

  const [active, setActive] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || reducedMotion) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [emblaApi, reducedMotion]);

  return (
    <div className="testimonials-desktop-wrap">
      <button
        type="button"
        className="testimonial-nav-btn testimonial-nav-btn-prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous testimonial"
      >
        <span aria-hidden>‹</span>
      </button>

      <div
        ref={emblaRef}
        className="testimonials-carousel overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div className="testimonials-carousel-track flex">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="testimonials-carousel-slide min-w-0 shrink-0 grow-0 basis-[82%] px-6 lg:basis-[72%] lg:px-10"
              aria-roledescription="slide"
              aria-hidden={i !== active}
            >
              <TestimonialCard
                testimonial={t}
                active={i === active}
                className={cn(
                  "testimonial-card-desktop",
                  !reducedMotion &&
                    (i === active
                      ? "testimonial-card-desktop-active"
                      : "testimonial-card-desktop-inactive")
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="testimonial-nav-btn testimonial-nav-btn-next"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next testimonial"
      >
        <span aria-hidden>›</span>
      </button>

      <div className="testimonials-controls mt-10">
        <p className="testimonials-counter" aria-live="polite">
          <span className="testimonials-counter-active">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="testimonials-counter-sep"> / </span>
          <span>{String(testimonials.length).padStart(2, "0")}</span>
        </p>

        <div className="testimonials-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                "testimonial-dot touch-target",
                i === active && "testimonial-dot-active",
                i === active && !reducedMotion && "testimonial-dot-autoplay"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}