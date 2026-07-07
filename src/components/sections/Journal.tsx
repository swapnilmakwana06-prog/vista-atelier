"use client";

import Image from "next/image";
import { journalArticles } from "@/lib/data";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function Journal() {
  const { preferLite } = usePerformanceMode();
  const imageQuality = preferLite
    ? IMAGE_QUALITY.defaultLite
    : IMAGE_QUALITY.default;
  return (
    <CosmicSection id="journal" className="section-padding">
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <p className="section-label mb-4">Journal</p>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            Stories & <span className="text-gold">Insights</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {journalArticles.map((article, i) => (
            <ScrollReveal key={article.id} variant="lift" delay={i * 110}>
              <article
                className="group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2"
                data-cursor="hover"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-card">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    loading="lazy"
                    quality={imageQuality}
                    className="crisp-image object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    sizes={IMAGE_SIZES.journal}
                  />
                </div>
                <p className="mb-2 text-xs tracking-[0.2em] text-terracotta uppercase">
                  {article.category} · {article.date}
                </p>
                <h3 className="mb-3 font-heading text-2xl transition-colors duration-500 group-hover:text-gold">
                  {article.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-secondary">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-gold uppercase opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Read
                  <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}