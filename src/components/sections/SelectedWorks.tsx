"use client";

import Link from "next/link";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { selectedWorks } from "@/lib/data";
import { IMAGE_SIZES } from "@/lib/image";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const layouts = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function SelectedWorks() {
  return (
    <CosmicSection className="portfolio-section section-padding">
      <div className="portfolio-atmosphere portfolio-atmosphere-alt" aria-hidden>
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <PortfolioHeader
            label="Selected Works"
            title="Curated"
            highlight="Moments"
            description="Editorial highlights from our most celebrated commissions — where material, light, and proportion converge."
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-12">
          {selectedWorks.map((work, i) => (
            <ScrollReveal
              key={work.id}
              variant="lift"
              delay={i * 100}
              className={layouts[i]}
            >
              <Tilt3D intensity={12} className="h-full">
                <Link
                  href={`/projects/${work.id}`}
                  className="portfolio-card group relative block h-full cursor-pointer"
                  data-cursor="hover"
                >
                  <div
                    className={cn(
                      "portfolio-card-frame relative min-h-[240px] overflow-hidden",
                      i === 0
                        ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[520px]"
                        : "aspect-[4/3]"
                    )}
                  >
                    <ProjectImage
                      src={work.image}
                      alt={work.title}
                      priority={i < 2}
                      sizes={IMAGE_SIZES.half}
                      className="portfolio-card-image transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />

                    <div className="portfolio-card-scrim absolute inset-0" />
                    <div className="portfolio-card-gold-wash absolute inset-0" />
                    <div className="portfolio-card-vignette absolute inset-0" />
                    <div className="portfolio-card-shine absolute inset-0" />

                    <span className="portfolio-card-index" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-0 z-10 flex items-end p-8">
                      <div className="translate-y-2 transition-all duration-700 ease-out group-hover:translate-y-0">
                        <div className="portfolio-card-line mb-4 h-px w-12 bg-gradient-to-r from-cyan via-gold to-transparent transition-all duration-700 ease-out group-hover:w-20" />
                        <p className="mb-1.5 text-[10px] tracking-[0.28em] text-cyan/90 uppercase">
                          {work.location}
                        </p>
                        <h3 className="font-heading text-2xl leading-tight text-heading md:text-3xl">
                          {work.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </Tilt3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}