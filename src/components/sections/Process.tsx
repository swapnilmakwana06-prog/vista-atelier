"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/lib/data";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { preferLite } = usePerformanceMode();

  useEffect(() => {
    if (reduced || preferLite) {
      timelineRef.current?.classList.add("process-line-active");
      return;
    }
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("process-line-active");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "-5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, preferLite]);

  return (
    <CosmicSection
      id="process"
      className="process-section portfolio-section relative section-padding"
    >
      <div className="portfolio-atmosphere portfolio-atmosphere-alt" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-20">
          <PortfolioHeader
            label="The Process"
            title="From Vision to"
            highlight="Revelation"
            description="Five deliberate phases — each guided by architectural rigor, material honesty, and the pursuit of spaces that feel inevitable."
          />
        </ScrollReveal>

        <div ref={timelineRef} className="process-timeline relative">
          <div className="process-line absolute top-0 bottom-0 left-4 hidden w-px origin-top md:left-7 md:block" />

          <div className="space-y-14 md:space-y-20">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.id} variant="lift" delay={i * 100}>
                <div className="process-step relative grid gap-6 md:grid-cols-[88px_1fr] md:gap-14">
                  <div className="flex items-start md:justify-center">
                    <div className="process-step-badge relative z-10 flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                      <span className="process-step-number font-heading text-sm md:text-base">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <article className="process-step-card group">
                    <div className="process-step-line mb-5 h-px w-12 bg-gradient-to-r from-cyan via-gold to-transparent transition-all duration-700 ease-out group-hover:w-20" />
                    <div className="mb-5 text-gold transition-transform duration-500 ease-out group-hover:scale-105">
                      <ServiceIcon name={step.icon} className="h-8 w-8" />
                    </div>
                    <p className="hero-premium-label mb-3">Phase {step.number}</p>
                    <h3 className="process-step-title mb-4">{step.title}</h3>
                    <p className="process-step-desc max-w-xl">{step.description}</p>
                  </article>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </CosmicSection>
  );
}