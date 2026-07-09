"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { cn } from "@/lib/utils";

function nearestSlideIndex(track: HTMLElement): number {
  const center = track.scrollLeft + track.clientWidth / 2;
  const slides = track.querySelectorAll<HTMLElement>("[data-testimonial-index]");
  let closest = 0;
  let minDist = Infinity;

  slides.forEach((slide) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const dist = Math.abs(center - slideCenter);
    const index = Number(slide.dataset.testimonialIndex ?? 0);
    if (dist < minDist) {
      minDist = dist;
      closest = index;
    }
  });

  return closest;
}

export function TestimonialsMobileTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const syncActive = () => {
      const next = nearestSlideIndex(track);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncActive();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    syncActive();

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(
      `[data-testimonial-index="${index}"]`
    );
    if (!track || !slide) return;

    const left =
      slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "auto" });
    activeRef.current = index;
    setActive(index);
  }, []);

  return (
    <>
      <div
        ref={trackRef}
        className="testimonials-track-mobile"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            data-testimonial-index={i}
            className="testimonials-slide-mobile"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
          >
            <TestimonialCard testimonial={t} active={i === active} />
          </div>
        ))}
      </div>

      <div className="testimonials-controls mt-8">
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
                i === active && "testimonial-dot-active"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </>
  );
}