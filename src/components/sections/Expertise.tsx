"use client";

import { services } from "@/lib/data";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { RevealStagger, ScrollReveal } from "@/components/ui/ScrollReveal";

export function Expertise() {
  return (
    <CosmicSection id="expertise" className="about-section portfolio-section section-padding">
      <div className="portfolio-atmosphere portfolio-atmosphere-alt" aria-hidden>
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <PortfolioHeader
            label="Our Expertise"
            title="Disciplines of"
            highlight="Distinction"
            description="Four pillars of practice — each rooted in architectural rigor, material honesty, and the pursuit of spaces that feel inevitable."
            className="mx-auto max-w-3xl text-center"
          />
        </ScrollReveal>

        <RevealStagger className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Tilt3D key={service.id} intensity={10} className="reveal-stagger-item">
              <article className="about-service-card group relative overflow-hidden p-10">
                <span className="about-service-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="about-service-line mb-8 h-px w-12 bg-gradient-to-r from-cyan via-gold to-transparent transition-all duration-700 ease-out group-hover:w-20" />
                <div className="mb-6 text-gold transition-transform duration-500 ease-out group-hover:scale-105">
                  <ServiceIcon name={service.icon} className="h-10 w-10" />
                </div>
                <h3 className="mb-3 font-heading text-2xl text-heading">{service.title}</h3>
                <p className="leading-relaxed text-secondary">{service.description}</p>
              </article>
            </Tilt3D>
          ))}
        </RevealStagger>
      </div>
    </CosmicSection>
  );
}