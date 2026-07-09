"use client";

import Link from "next/link";
import { memo } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { IMAGE_SIZES } from "@/lib/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  index?: number;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  priority = false,
  index,
}: ProjectCardProps) {
  const aspectClass = {
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
    square: "aspect-square",
  }[project.aspect];

  return (
      <Link
        href={`/projects/${project.id}`}
        className="portfolio-card portfolio-card-premium group relative mb-7 block cursor-pointer break-inside-avoid"
        data-cursor="hover"
      >
        <div
          className={cn(
            "portfolio-card-frame relative min-h-[240px] overflow-hidden",
            aspectClass
          )}
        >
          <ProjectImage
            src={project.image}
            alt={project.title}
            priority={priority}
            sizes={IMAGE_SIZES.project}
            className="portfolio-card-image"
          />

          <div className="portfolio-card-scrim absolute inset-0" />
          <div className="portfolio-card-gold-wash absolute inset-0" />
          <div className="portfolio-card-vignette absolute inset-0" />
          <div className="portfolio-card-shine absolute inset-0" />
          <div className="portfolio-card-border-glow absolute inset-0" aria-hidden />

          {typeof index === "number" && (
            <span className="portfolio-card-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <span className="portfolio-card-arrow" aria-hidden>
            →
          </span>

          <div className="portfolio-card-content absolute inset-x-0 bottom-0 z-10 p-7">
            <div className="portfolio-card-line mb-4 h-px w-12 bg-gradient-to-r from-cyan via-gold to-transparent" />
            <p className="portfolio-card-meta mb-1.5 text-[10px] tracking-[0.28em] text-cyan/90 uppercase">
              {project.category} · {project.year}
            </p>
            <h3 className="portfolio-card-title font-heading text-2xl leading-tight text-heading md:text-[1.65rem]">
              {project.title}
            </h3>
            <p className="portfolio-card-location mt-1.5 text-sm text-secondary/90">
              {project.location}
            </p>
          </div>
        </div>
      </Link>
  );
});