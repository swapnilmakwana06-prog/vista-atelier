"use client";

import Link from "next/link";
import { useState } from "react";
import { sectionCopy, signatureProjects } from "@/lib/data";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IMAGE_SIZES } from "@/lib/image";
import type { ProjectCategory } from "@/types";

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const featured = signatureProjects[0];

  const filtered =
    filter === "All"
      ? signatureProjects.slice(1)
      : signatureProjects.filter((p) => p.category === filter);

  const projectCount =
    filter === "All" ? signatureProjects.length : filtered.length;

  return (
    <CosmicSection
      id="projects"
      className="signature-projects-section luxury-section portfolio-section section-padding-luxury"
    >
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="luxury-section-rule" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-14 md:mb-20">
          <PortfolioHeader
            label={sectionCopy.projects.label}
            title={sectionCopy.projects.title}
            highlight={sectionCopy.projects.highlight}
            description={sectionCopy.projects.description}
          >
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <FilterTabs active={filter} onChange={setFilter} />
              <p className="signature-project-count text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {projectCount} Project{projectCount !== 1 ? "s" : ""}
              </p>
            </div>
          </PortfolioHeader>
        </ScrollReveal>

        {filter === "All" && (
          <ScrollReveal variant="lift" className="mb-8 md:mb-10">
            <Link
              href={`/projects/${featured.id}`}
              className="signature-featured group relative block overflow-hidden"
              data-cursor="hover"
            >
              <div className="signature-featured-media relative aspect-[21/9] min-h-[280px] md:min-h-[380px]">
                <ProjectImage
                  src={featured.image}
                  alt={featured.title}
                  priority
                  sizes={IMAGE_SIZES.full}
                  className="signature-featured-image"
                />
                <div className="signature-featured-scrim absolute inset-0" />
                <div className="signature-featured-glow absolute inset-0" />
              </div>

              <div className="signature-featured-content absolute inset-x-0 bottom-0 z-10 p-8 md:p-12">
                <span className="signature-featured-badge">Featured Commission</span>
                <div className="portfolio-card-line mb-5 mt-4 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent transition-all duration-700 ease-out group-hover:w-24" />
                <p className="mb-2 text-[10px] tracking-[0.28em] text-cyan/90 uppercase">
                  {featured.category} · {featured.year}
                </p>
                <h3 className="font-heading text-3xl leading-tight text-heading md:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-2 text-sm text-secondary/90 md:text-base">
                  {featured.location}
                </p>
                <p className="signature-featured-desc mt-4 max-w-2xl text-sm leading-relaxed text-secondary/80 md:text-base">
                  {featured.description}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        )}

        <div className="signature-grid portfolio-grid columns-1 gap-7 md:columns-2 lg:columns-3">
          {filtered.map((project, index) => (
            <ScrollReveal
              key={project.id}
              variant="scale"
              delay={index * 60}
              amount={0.08}
            >
              <ProjectCard
                project={project}
                index={filter === "All" ? index + 1 : index}
                priority={index < 2}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}