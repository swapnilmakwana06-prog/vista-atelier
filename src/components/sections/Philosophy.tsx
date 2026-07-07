"use client";

import { philosophyMaterials, studioStats } from "@/lib/data";
import { CinematicImageFrame } from "@/components/ui/CinematicImageFrame";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { RevealStagger, ScrollReveal } from "@/components/ui/ScrollReveal";

const philosophyImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85";

export function Philosophy() {
  return (
    <CosmicSection id="philosophy" className="about-section portfolio-section section-padding">
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <RevealStagger>
            <div className="reveal-stagger-item">
              <PortfolioHeader
                label="About the Studio"
                title="Design is not decoration. It is"
                highlight="the architecture of feeling."
                description="At VISTA Atelier, we believe the most luxurious spaces are those that breathe — where negative space is as intentional as the finest marble, and every material tells a story of craft and permanence."
              />
            </div>

            <div className="reveal-stagger-item mt-10">
              <blockquote className="about-quote">
                <span className="about-quote-mark" aria-hidden>
                  &ldquo;
                </span>
                <p>We do not fill rooms. We compose atmospheres.</p>
              </blockquote>
            </div>

            <div className="reveal-stagger-item about-stats mt-12 grid grid-cols-3 gap-4">
              {studioStats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="reveal-stagger-item mt-10 flex flex-wrap gap-3">
              {philosophyMaterials.map((mat) => (
                <span key={mat} className="about-material-tag">
                  {mat}
                </span>
              ))}
            </div>
          </RevealStagger>

          <ScrollReveal variant="scale" delay={120}>
            <Tilt3D intensity={10}>
              <CinematicImageFrame
                src={philosophyImage}
                alt="Luxury interior philosophy"
                className="aspect-[4/5] min-h-[420px]"
              />
            </Tilt3D>
          </ScrollReveal>
        </div>
      </div>
    </CosmicSection>
  );
}