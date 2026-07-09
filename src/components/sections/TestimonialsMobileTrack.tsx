"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { cn } from "@/lib/utils";

export function TestimonialsMobileTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>("[data-testimonial-index]");
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const ratio = entry.intersectionRatio;
          const index = Number(entry.target.getAttribute("data-testimonial-index"));
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        }

        if (bestIndex >= 0) setActive(bestIndex);
      },
      {
        root: track,
        threshold: [0.55, 0.7, 0.85],
      }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(
      `[data-testimonial-index="${index}"]`
    );
    if (!track || !slide) return;

    const left =
      slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
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