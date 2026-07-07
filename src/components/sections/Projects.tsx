"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { PortfolioHeader } from "@/components/ui/PortfolioHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ProjectCategory } from "@/types";

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <CosmicSection id="projects" className="portfolio-section section-padding">
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <ScrollReveal variant="cinematic" accent className="mb-16">
          <PortfolioHeader
            label="Signature Portfolio"
            title="Spaces That"
            highlight="Define Luxury"
            description="A curated collection of residential, commercial, and hospitality environments — each crafted with cinematic precision and quiet sophistication."
          >
            <div className="flex flex-col items-start gap-6 lg:items-end">
              <FilterTabs active={filter} onChange={setFilter} />
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </PortfolioHeader>
        </ScrollReveal>

        <div className="portfolio-grid columns-1 gap-6 md:columns-2 lg:columns-3">
          {filtered.map((project, index) => (
            <ScrollReveal
              key={project.id}
              variant="scale"
              delay={index * 70}
              amount={0.1}
            >
              <ProjectCard
                project={project}
                index={index}
                priority={index < 3}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </CosmicSection>
  );
}