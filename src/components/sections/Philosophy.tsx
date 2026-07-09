"use client";

import {
  philosophyContent,
  philosophyMaterials,
  studioStats,
} from "@/lib/data";
import { CinematicImageFrame } from "@/components/ui/CinematicImageFrame";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { RevealStagger, ScrollReveal } from "@/components/ui/ScrollReveal";

export function Philosophy() {
  const { pillars, primaryImage, accentImage } = philosophyContent;

  return (
    <CosmicSection
      id="philosophy"
      className="about-section luxury-section portfolio-section section-padding-luxury"
    >
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="luxury-section-rule" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20 xl:gap-24">
          <RevealStagger className="lg:col-span-5">
            <div className="reveal-stagger-item">
              <PortfolioHeader
                label={philosophyContent.label}
                title={philosophyContent.title}
                highlight={philosophyContent.highlight}
                description={philosophyContent.description}
              />
            </div>

            <div className="reveal-stagger-item mt-10">
              <blockquote className="about-quote">
                <span className="about-quote-mark" aria-hidden>
                  &ldquo;
                </span>
                <p>{philosophyContent.quote}</p>
              </blockquote>
            </div>

            <div className="reveal-stagger-item about-pillars mt-12 space-y-6">
              {pillars.map((pillar, i) => (
                <article key={pillar.title} className="about-pillar">
                  <span className="about-pillar-index" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="about-pillar-title">{pillar.title}</h3>
                    <p className="about-pillar-text">{pillar.text}</p>
                  </div>
                </article>
              ))}
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

          <ScrollReveal
            variant="scale"
            delay={120}
            className="lg:col-span-7"
          >
            <Tilt3D intensity={8}>
              <div className="philosophy-visual-duo">
                <CinematicImageFrame
                  src={primaryImage}
                  alt="VISTA Atelier interior philosophy"
                  className="philosophy-visual-main aspect-[4/5] min-h-[440px]"
                />
                <div className="philosophy-visual-accent-wrap">
                  <CinematicImageFrame
                    src={accentImage}
                    alt="Luxury material detail"
                    className="philosophy-visual-accent aspect-[5/4] min-h-[200px]"
                  />
                  <div className="philosophy-visual-caption">
                    <span className="hero-premium-label">Material Study</span>
                    <p>Light · Texture · Permanence</p>
                  </div>
                </div>
                <div className="philosophy-visual-frame" aria-hidden />
              </div>
            </Tilt3D>
          </ScrollReveal>
        </div>
      </div>
    </CosmicSection>
  );
}